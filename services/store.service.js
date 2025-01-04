const storeRepository = require("../repositories/store.repo");
const areaRepository = require("../repositories/area.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createStore = async (storeData) => {
    const areaId = storeData.areaId;
    const area = await areaRepository.findAreaById(areaId);

    if (!area) {
        throw new Error("Area not found");
    }

    storeData.cityId = area.cityId;
    return await storeRepository.createStore(storeData);
};
const updateStore = async (storeId, updateData) => {
    if (updateData.hasOwnProperty("deleted")) {
        throw new BadRequest("Cannot update the 'deleted' field.");
    }

    return await storeRepository.updateStore(storeId, updateData);
};

const updateStaff = async (storeId, managerId) => {
    return await storeRepository.updateStore(storeId, { managerId });
};

const getStoresByArea = async (areaId) => {
    return await storeRepository.getStoresByArea(areaId);
};

module.exports = {
    createStore,
    updateStore,
    updateStaff,
    getStoresByArea,
};
