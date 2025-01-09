const areaRepository = require("../repositories/area.repo");
const cityRepository = require("../repositories/city.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createArea = async (areaData) => {
    // Kiểm tra city có tồn tại không
    const cityExists = await cityRepository.findCityById(areaData.cityId);
    if (!cityExists) {
        throw new NotFound("City does not exist.");
    }

    // Kiểm tra area đã tồn tại chưa
    const existingArea = await areaRepository.findAreaByName(areaData.name);
    if (existingArea) {
        throw new BadRequest("An area with this name already exists.");
    }

    // Tạo Area
    const area = await areaRepository.createArea(areaData);

    // Tăng `totalAreas` của City lên 1
    await cityRepository.updateCityById(areaData.cityId, {
        $inc: { totalAreas: 1 },
    });

    return area;
};

const updateArea = async (id, updateData) => {
    if (updateData.deleted !== undefined) {
        throw new BadRequest("Cannot update the 'deleted' field.");
    }
    const areaExists = await areaRepository.findAreaById(id);
    if (!areaExists) {
        throw new NotFound("Area not found.");
    }
    return await areaRepository.updateArea(id, updateData);
};

const getAreasByCityId = async (cityId) => {
    return await areaRepository.findAreasByCityId(cityId);
};

const getAreaById = async (id) => {
    const area = await areaRepository.findAreaById(id);
    if (!area) {
        throw new NotFound("Area not found.");
    }
    return area;
};

module.exports = {
    createArea,
    updateArea,
    getAreasByCityId,
    getAreaById,
};
