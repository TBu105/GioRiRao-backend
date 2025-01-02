const storeService = require("../services/store.service");

const createStore = async (req, res, next) => {
    try {
        const store = await storeService.createStore(req.body);
        res.status(201).json(store);
    } catch (error) {
        next(error);
    }
};

const updateStore = async (req, res, next) => {
    try {
        const store = await storeService.updateStore(req.params.id, req.body);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
};

const updateStoreManager = async (req, res, next) => {
    try {
        const store = await storeService.updateStoreManager(req.params.id, req.body.managerId);
        res.status(200).json(store);
    } catch (error) {
        next(error);
    }
};

const getStoresByAreaId = async (req, res, next) => {
    try {
        const stores = await storeService.getStoresByAreaId(req.params.areaId);
        res.status(200).json(stores);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStore,
    updateStore,
    updateStoreManager,
    getStoresByAreaId,
};
