const storeRepository = require("../repositories/store.repo");
const areaRepository = require("../repositories/area.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createStore = async (storeData) => {
    const area = await areaRepository.findAreaById(storeData.areaId);
    if (!area) {
        throw new NotFound("Area not found");
    }
    return await storeRepository.createStore(storeData);
};

const updateStore = async (id, updateData) => {
    if ("deleted" in updateData) {
        throw new BadRequest("Cannot update the 'deleted' field");
    }
    const store = await storeRepository.updateStore(id, updateData);
    if (!store) {
        throw new NotFound("Store not found");
    }
    return store;
};

const updateStoreManager = async (id, managerId) => {
    const store = await storeRepository.updateStore(id, { managerId });
    if (!store) {
        throw new NotFound("Store not found");
    }
    return store;
};

const getStoresByAreaId = async (areaId) => {
    return await storeRepository.findStoresByAreaId(areaId);
};

module.exports = {
    createStore,
    updateStore,
    updateStoreManager,
    getStoresByAreaId,
};
