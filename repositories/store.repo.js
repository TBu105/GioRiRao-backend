const Store = require("../models/Store");

const createStore = async (storeData) => {
  const store = new Store(storeData);
  return await store.save();
};

const updateStore = async (storeId, updateData) => {
  return await Store.findByIdAndUpdate(storeId, updateData, { new: true });
};

const updateStoreStaff = async (storeId, staffIds) => {
  const updatedStaff = await Store.findByIdAndUpdate(
    storeId,
    { $push: { staffs: staffIds } },
    { new: true }
  );

  return updatedStaff;
};

const updateStoreManager = async (storeId, managerId) => {
  const updateManager = await Store.findByIdAndUpdate(
    storeId,
    { managerId },
    { new: true }
  );

  return updateManager;
};

const getStoresByArea = async (areaId) => {
  return await Store.find({ areaId, deleted: false }).lean();
};
const findStore = async (data) => {
  return await Store.findOne(data).lean();
};
const findStoreById = async (id) => {
  return await Store.findById(id, { deleted: false }).lean();
};
module.exports = {
  createStore,
  updateStore,
  getStoresByArea,
  findStore,
  findStoreById,
  updateStoreStaff,
  updateStoreManager,
};
