const ko = require("nekodb");

ko.connect({
  client: "nedb",
  filepath: __dirname + "/data",
});

ko.models({
  Discount: {
    isPercent: ko.Boolean,
    discount: ko.Number
  },
  Payment: {
    date: ko.Date,
    amount: ko.Number,
    type: ko.Number
  },
  MedicalBillingMaster: {
    name: ko.String[50],
    price: ko.Number,
    maxDiscount: ko.models.Discount,
    slotsPerDay: ko.Number // 0 for infinity
  },
  Appointments: {
    name: ko.String[256],
    age: ko.Number,
    ageType: ko.String[1],
    gender: ko.String[10],
    appointmentDate: ko.Date,
    amount: ko.Number,
    discount: ko.Number,
    total: ko.Number,
    payments: [ko.models.Payment]
  }
})

module.exports = ko;
