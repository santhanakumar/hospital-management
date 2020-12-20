const db = require("../database/index");

const settings = {
  method: "GET",
  path: "/settings/getBillingMaster",
  handler: async () => {
    const instances = await db.models.MedicalBillingMaster.find({}).join();
    return instances;
  },
};

const settingsSearch = {
  method: "GET",
  path: "/settings/getBillingMaster/search/{searchText}",
  handler: async (req) => {
    console.log(req.params.searchText);
    const regex = new RegExp(req.params.searchText, "i");
    const instances = await db.models.MedicalBillingMaster.find({
      name: { $regex: regex },
    }).join();
    return instances;
  },
};

module.exports = [settings, settingsSearch];
