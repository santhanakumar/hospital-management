const db = require("../database/index");

const settings = {
  method: "GET",
  path: "/settings/getBillingMaster",
  handler: async () => {
    const instances = await db.models.MedicalBillingMaster.find({}).join();
    return instances;
  },
};

module.exports = [settings];
