const Inventory = require("../models/Inventory");

const findInventoryByStore = async ({ storeId }) => {
  let inventory = await Inventory.findOne({ storeId });
  return inventory;
};

const getInventoryByStore = async (storeId, session = null) => {
  const inventory = await Inventory.findOne({ storeId }).session(session);
  return inventory;
};

module.exports = {
  findInventoryByStore,
  getInventoryByStore,
};
