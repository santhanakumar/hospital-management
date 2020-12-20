const db = require("../database/index");

const appointments = {
  method: "GET",
  path: "/appointments",
  handler: async () => {
    const instances = await db.models.Appointments.find({}).join();
    return instances;
  },
};

const putAppointments = {
  method: "PUT",
  path: "/appointments",
  handler: async (request) => {
    const {
      name,
      age,
      ageType,
      gender,
      appointmentDate,
      amount,
      discount,
      total,
    } = request.payload;
    const paymentIds = [];
    request.payload.payments.forEach(async ({ date, amount, type }) => {
      const payment = await db.models.Payment.create({
        date,
        amount,
        type,
      }).save();
      paymentIds.push(payment._id);
    });
    await db.models.Appointments.create({
      name,
      age,
      ageType,
      gender,
      appointmentDate,
      amount,
      discount,
      total,
      payments: paymentIds,
    }).save();
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
    const {
      id,
      name,
      age,
      ageType,
      gender,
      appointmentDate,
      amount,
      discount,
      total,
    } = request.payload;
    const paymentIds = [];
    request.payload.payments.forEach(
      async ({ id: paymentId, date, amount, type }) => {
        let payment;
        if (paymentId) {
          payment = await db.models.Payment.findById(paymentId);
        } else {
          payment = await db.models.Payment.create();
        }
        payment.date = date;
        payment.amount = amount;
        payment.type = type;
        await payment.save();
        paymentIds.push(payment._id);
      }
    );
    let appointment;
    if (id) {
      appointment = await db.models.Appointments.findById(id);
    } else {
      appointment = await db.models.Appointments.create({});
    }
    appointment.name = name;
    appointment.age = age;
    appointment.ageType = ageType;
    appointment.gender = gender;
    appointment.appointmentDate = appointmentDate;
    appointment.amount = amount;
    appointment.discount = discount;
    appointment.total = total;
    appointment.payments = paymentIds;
    await appointment.save();
    return {
      status: "success",
      message: "Appointment saved successfully",
    };
  },
};

module.exports = [appointments, putAppointments, postAppointments];
