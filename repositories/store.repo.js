const Store = require("../models/Store");

const createStore = async (storeData) => {
  const store = new Store(storeData);
  return await store.save();
};

const updateStore = async (storeId, updateData) => {
  return await Store.findByIdAndUpdate(storeId, updateData, { new: true });
};

const updateStoreStaff = async (storeId, staffId) => {
  const updatedStaff = await Store.findByIdAndUpdate(
    storeId,
    { $addToSet: { staffs: staffId } },
    { new: true }
  );

  return updatedStaff;
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

const getStaffsOfTheStore = async (storeId) => {
  const store = await Store.findById(storeId)
    .populate("staffs")
    .populate("managerId")
    .lean();
  if (!store) {
    throw new Error("Store not found.");
  }

  return store;
};

module.exports = {
  createStore,
  updateStore,
  getStoresByArea,
  findStore,
  findStoreById,
  updateStoreStaff,
  getStaffsOfTheStore,
};
