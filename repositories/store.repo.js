const Store = require("../models/Store");

const createStore = async (storeData) => {
    const store = new Store(storeData);
    return await store.save();
};

const updateStore = async (id, updateData) => {
    return await Store.findByIdAndUpdate(id, updateData, { new: true });
};

const findStoreById = async (id) => {
    return await Store.findById(id);
};

const findStoresByAreaId = async (areaId) => {
    return await Store.find({ areaId, deleted: false });
};

module.exports = {
    createStore,
    updateStore,
    findStoreById,
    findStoresByAreaId,
};
