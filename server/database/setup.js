const db = require("./index");

const setup = async () => {
  const ctBrain = await db.models.MedicalBillingMaster.findOne({
    name: "CT Brain",
  });
  if (!ctBrain) {
    const discount = await db.models.Discount.create({
      isPercent: false,
      discount: 100,
    }).save();
    await db.models.MedicalBillingMaster.create({
      name: "CT Brain",
      price: 600,
      maxDiscount: discount._id,
      slotsPerDay: 7,
    }).save();
  }

  const mriBrain = await db.models.MedicalBillingMaster.findOne({
    name: "MRI Brain",
  });
  if (!mriBrain) {
    const discount = await db.models.Discount.create({
      isPercent: false,
      discount: 300,
    }).save();
    await db.models.MedicalBillingMaster.create({
      name: "MRI Brain",
      price: 1000,
      maxDiscount: discount._id,
      slotsPerDay: 6,
    }).save();
  }

  const glucoseFasting = db.models.MedicalBillingMaster.findOne({
    name: "Glucose Fasting",
  });
  if (!glucoseFasting) {
    const discount = await db.models.Discount.create({
      isPercent: true,
      discount: 10,
    }).save();
    await db.models.MedicalBillingMaster.create({
      name: "Glucose Fasting",
      price: 100,
      maxDiscount: discount._id,
      slotsPerDay: 0,
    }).save();
  }
};

module.exports = setup;
