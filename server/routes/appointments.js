const dayjs = require("dayjs");
const db = require("../database/index");

const APPOINTMENT_STATUS = {
  NOT_YET_BILLED: "Not yet Billed",
  DUE_BILLED: "Due Billed",
  FULLY_BILLED: "Fully Billed",
};

const getBalance = (totalAmount, payments) => {
  const paid = payments.reduce((total, current) => total + current.amount, 0);
  return totalAmount - paid;
};

const appointments = {
  method: "GET",
  path: "/appointments",
  handler: async () => {
    const instances = await db.models.Appointments.find({}).join();
    return instances;
  },
};

const getAppointment = {
  method: "GET",
  path: "/appointments/{id}",
  handler: async (req) => {
    const instance = await db.models.Appointments.findById(
      req.params.id
    ).join();
    return instance;
  },
};

const savePayments = async (payments) => {
  const paymentIds = [];
  if (!payments) {
    return paymentIds;
  }
  await Promise.all(
    payments.map(async ({ id: paymentId, date, amount, type }) => {
      let payment;
      if (paymentId) {
        payment = await db.models.Payment.findById(paymentId);
      } else {
        payment = await db.models.Payment.create({});
      }
      payment.date = date;
      payment.amount = amount;
      payment.type = type;
      await payment.save();
      paymentIds.push(payment._id);
    })
  );

  return paymentIds;
};

const saveBillingInfo = async (billingInfo) => {
  const scanInfoIds = [];
  if (!billingInfo) {
    return scanInfoIds;
  }
  await Promise.all(
    billingInfo.map(
      async ({ id: scanId, billingId, amount, scanDiscount, total }) => {
        let scanInfo;
        if (scanId) {
          scanInfo = await db.models.ScanInfo.findById(scanId);
        } else {
          scanInfo = await db.models.ScanInfo.create({});
        }
        scanInfo.billing = billingId;
        scanInfo.amount = amount;
        scanInfo.scanDiscount = scanDiscount;
        scanInfo.total = total;
        await scanInfo.save();
        scanInfoIds.push(scanInfo._id);
      }
    )
  );
  return scanInfoIds;
};

const putAppointments = {
  method: "PUT",
  path: "/appointments",
  handler: async (request) => {
    const { id, payments, billingInfo, ...appointmentInfo } = request.payload;
    const billingWithRestriction = await db.models.MedicalBillingMaster.find({
      slotsPerDay: { $gt: 0 },
    });
    const errors = [];
    await Promise.all(
      billingWithRestriction.map(async (billing) => {
        const findAppointmentByDate = await db.models.Appointments.find({
          appointmentDate: dayjs(appointmentInfo.appointmentDate).valueOf(),
        }).join();
        const currentBillingCount = billingInfo.filter(
          ({ billingId }) => billingId === billing._id
        ).length;
        const billedCount = findAppointmentByDate.reduce(
          (total, appointment) => {
            return (
              total +
              appointment.billingInfo.filter(
                (bill) => bill.billing === billing._id
              ).length
            );
          },
          0
        );
        if (currentBillingCount + billedCount > billing.slotsPerDay) {
          errors.push({
            message: `In a day only ${billing.slotsPerDay} ${billing.name} billings are allowed.`,
          });
        }
      })
    );
    if (errors.length > 0) {
      return {
        status: "error",
        message: errors,
      };
    }
    const appointment = await db.models.Appointments.create({});
    Object.keys(appointmentInfo).forEach((key) => {
      appointment[key] = appointmentInfo[key];
    });
    appointment.billingInfo = await saveBillingInfo(billingInfo);
    appointment.payments = await savePayments(payments);
    appointment.lastUpdated = new Date();
    await appointment.save();
    return {
      status: "success",
      message: "Appointment saved successfully",
    };
  },
};

const postAppointments = {
  method: "POST",
  path: "/appointments",
  handler: async (request) => {
    const { id, payments, ...appointmentInfo } = request.payload;
    const appointment = await db.models.Appointments.findById(id);
    Object.keys(appointmentInfo).forEach((key) => {
      appointment[key] = appointmentInfo[key];
    });
    appointment.payments = savePayments(payments);
    appointment.lastUpdated = new Date();
    await appointment.save();
    return {
      status: "success",
      message: "Appointment saved successfully",
    };
  },
};

const filterAppointments = {
  method: "POST",
  path: "/appointments/filters",
  handler: async (request) => {
    const { fromDate, toDate, status, term } = request.payload || {};
    let filters = [];
    if (fromDate || toDate) {
      filters.push({
        appointmentDate: {
          ...(fromDate && { $gte: dayjs(fromDate).valueOf() }),
          ...(toDate && { $lte: dayjs(toDate).valueOf() }),
        },
      });
    }
    if (status) {
      filters.push({
        status,
      });
    }
    if (term) {
      const regex = new RegExp(term, "i");
      filters.push({
        $or: [
          { name: { $regex: regex } },
          { gender: { $regex: regex } },
          { phoneNo: { $regex: regex } },
          { addressLine1: { $regex: regex } },
          { addressLine2: { $regex: regex } },
          { city: { $regex: regex } },
          { state: { $regex: regex } },
          { zipcode: { $regex: regex } },
          { country: { $regex: regex } },
        ],
      });
    }
    const filterQuery =
      filters.length > 1 ? { $and: [...filters] } : filters[0];

    const appointments = await db.models.Appointments.find(filterQuery).join();
    return appointments;
  },
};

const addPayment = {
  method: "POST",
  path: "/appointments/addPayment/{id}",
  handler: async (req) => {
    const { amount, type, transactionNumber } = req.payload;
    const appointment = await db.models.Appointments.findById(
      req.params.id
    ).join();
    let status = APPOINTMENT_STATUS.DUE_BILLED;
    if (appointment.payments.length === 2) {
      const balance = getBalance(appointment.total, appointment.payments);
      if (balance !== amount) {
        return {
          status: "error",
          message: `Could not add payment, amount should be ${balance} INR`,
        };
      } else {
        status = APPOINTMENT_STATUS.FULLY_BILLED;
      }
    }
    const payment = await db.models.Payment.create({
      date: dayjs().startOf("day").toDate(),
      amount,
      type,
      transactionNumber,
    }).save();
    appointment.payments.$push(payment._id);
    appointment.status = status;
    appointment.lastUpdated = new Date();
    await appointment.save();
    return {
      status: "success",
      message: "Appointment saved successfully",
    };
  },
};

module.exports = [
  appointments,
  getAppointment,
  putAppointments,
  postAppointments,
  filterAppointments,
  addPayment,
];
