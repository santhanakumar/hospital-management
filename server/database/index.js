const ko = require("nekodb");

ko.connect({
  client: "nedb",
  filepath: __dirname + "/data",
});

ko.models({
  Discount: {
    isPercent: ko.Boolean,
    discount: ko.Number,
  },
  Payment: {
    date: ko.Date,
    amount: ko.Number,
    type: ko.String[5],
    transactionNumber: ko.String,
  },
  MedicalBillingMaster: {
    name: ko.String[50],
    price: ko.Number,
    maxDiscount: ko.models.Discount,
    slotsPerDay: ko.Number, // 0 for infinity
  },
  ScanInfo: {
    billing: ko.models.MedicalBillingMaster,
    amount: ko.Number,
    scanDiscount: ko.Number,
    total: ko.Number,
  },
  Appointments: {
    lastUpdated: ko.Date,
    salutation: ko.Number,
    name: ko.String[256],
    gender: ko.String[10],
    dob: ko.Date,
    age: ko.Number,
    ageType: ko.String[10],
    appointmentDate: ko.Date,
    phoneNo: ko.String[256],
    addressLine1: ko.String[256],
    addressLine2: ko.String[256],
    city: ko.String[256],
    state: ko.String[256],
    zipcode: ko.String[256],
    country: ko.String[256],
    status: ko.String[20],
    amount: ko.Number,
    discount: ko.Number,
    total: ko.Number,
    billingInfo: [ko.models.ScanInfo],
    payments: [ko.models.Payment],
  },
});

module.exports = ko;
