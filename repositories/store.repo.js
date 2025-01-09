const Store = require("../models/Store");

const createStore = async (storeData) => {
    const store = new Store(storeData);
    return await store.save();
};

const updateStore = async (storeId, updateData) => {
    return await Store.findByIdAndUpdate(storeId, updateData, { new: true });
};

const getStoresByArea = async (areaId) => {
    return await Store.find({ areaId, deleted: false }).lean();
};
const findStoreByName = async (name) => {
    return await Store.findOne({ name }).lean();
};
const findStoreById = async (id) => {
    return await Store.findById(id, { deleted: false }).lean();
};
module.exports = {
    createStore,
    updateStore,
    getStoresByArea,
    findStoreByName,
    findStoreById,
};
