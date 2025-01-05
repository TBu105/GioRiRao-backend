const Store = require("../models/Store");

const createStore = async (storeData) => {
    console.log("Store Data", storeData);
    const store = new Store(storeData);
    console.log("Store", store);
    return await store.save();
};

const updateStore = async (storeId, updateData) => {
    return await Store.findByIdAndUpdate(storeId, updateData, { new: true });
};

const getStoresByArea = async (areaId) => {
    return await Store.find({ areaId, deleted: false });
};

module.exports = {
    createStore,
    updateStore,
    getStoresByArea,
};
