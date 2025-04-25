const Store = require("../models/Store");

const createStore = async (storeData) => {
  const store = new Store(storeData);
  return await store.save();
};

const getStoreById = async (storeId) => {
  return await Store.findById(storeId).lean();
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

const getAllStoreId = async () => {
  const stores = await Store.find({ deleted: false }, "_id").lean();
  if (!stores) {
    throw new Error("Store not found.");
  }
  const storeIds = stores.map((store) => store._id.toString());
  return storeIds;
};

const getStoreStaffWorkIn = async (staffId) => {
  const store = await Store.findOne({ staffs: staffId });
  return store;
};

const getStoreManagerWorkIn = async (staffId) => {
  const store = await Store.findOne({ managerId: staffId });

  return store;
};

const findStoreByName = async (name) => {
  return await Store.findOne({ name }).lean();
};
const getStoreByManagerId = async (managerId) => {
  return await Store.findOne({ managerId }).lean();
};

module.exports = {
  getStoreByManagerId,
  getStoreById,
  getStaffsOfTheStore,
  findStoreByName,
  createStore,
  updateStore,
  getStoresByArea,
  findStore,
  findStoreById,
  updateStoreStaff,
  getStaffsOfTheStore,
  getAllStoreId,
  getStoreStaffWorkIn,
  getStoreManagerWorkIn,
};
