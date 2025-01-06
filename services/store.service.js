const storeRepository = require("../repositories/store.repo");
const areaRepository = require("../repositories/area.repo");
const cityRepository = require("../repositories/city.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createStore = async (storeData) => {
    const { areaId, name } = storeData;

    // Kiểm tra xem Area có tồn tại hay không
    const area = await areaRepository.findAreaById(areaId);
    if (!area) {
        throw new NotFound("Area not found.");
    }

    // Kiểm tra xem Store với tên đã tồn tại chưa
    const existingStore = await storeRepository.findStoreByName(name);
    if (existingStore) {
        throw new BadRequest("This store already exists.");
    }

    // Gán cityId từ Area
    storeData.cityId = area.cityId;

    // Tạo store mới
    const store = await storeRepository.createStore(storeData);

    // Tăng `totalStores` trong Area lên 1
    await areaRepository.updateArea(areaId, {
        $inc: { totalStores: 1 },
    });

    // Tăng `totalStores` trong City lên 1
    await cityRepository.updateCityById(area.cityId, {
        $inc: { totalStores: 1 },
    });

    return store;
};

const updateStore = async (storeId, updateData) => {
    // Kiểm tra store có tồn tại hay không
    const store = await storeRepository.findStoreById(storeId);
    if (!store) {
        throw new NotFound("Store not found.");
    }

    // Kiểm tra store có bị xóa không
    if (store.deleted) {
        throw new BadRequest("Cannot update a deleted store.");
    }

    // Không cho phép cập nhật trường 'deleted'
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
