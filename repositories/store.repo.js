const Store = require('../models/Store');

const createStore = async (storeData) => {
    try {
        const store = new Store(storeData);
        return await store.save();
    } catch (error) {
        throw error;
    }
};

const updateStore = async (id, updateData) => {
    try {
        return await Store.findByIdAndUpdate(
            id,
            { $set: { ...updateData, deleted: false } },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

const getStoreById = async (id) => {
    try {
        return await Store.findOne({ _id: id, deleted: false })
            .populate('areaId', 'name')
            .populate('managerId', 'name');
    } catch (error) {
        throw error;
    }
};

const getAllStores = async () => {
    try {
        return await Store.find({ deleted: false })
            .populate('areaId', 'name')
            .populate('managerId', 'name');
    } catch (error) {
        throw error;
    }
};

const getStoresByArea = async (areaId) => {
    try {
        return await Store.find({ areaId, deleted: false })
            .populate('areaId', 'name')
            .populate('managerId', 'name');
    } catch (error) {
        throw error;
    }
};

const softDeleteStore = async (id) => {
    try {
        return await Store.findByIdAndUpdate(
            id,
            { deleted: true },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createStore,
    updateStore,
    getStoreById,
    getAllStores,
    getStoresByArea,
    softDeleteStore
};