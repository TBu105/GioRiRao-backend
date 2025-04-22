const Inventory = require("../models/Inventory");

const findInventoryByStore = async ({ storeId }) => {
  let inventory = await Inventory.findOne({ storeId });
  return inventory;
};

module.exports = {
  findInventoryByStore,
};
