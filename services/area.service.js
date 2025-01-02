const cityRepository = require("../repositories/city.repo");
const areaRepository = require("../repositories/area.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createArea = async (areaData) => {
    const city = await cityRepository.findCityById(areaData.cityId);
    if (!city) {
        throw new NotFound("City not found");
    }
    const area = await areaRepository.createArea(areaData);
    city.totalAreas += 1;
    await city.save();
    return area;
};

const updateArea = async (id, updateData) => {
    if ("deleted" in updateData) {
        throw new BadRequest("Cannot update the 'deleted' field");
    }
    const area = await areaRepository.updateArea(id, updateData);
    if (!area) {
        throw new NotFound("Area not found");
    }
    return area;
};

const getAreasByCityId = async (cityId) => {
    return await areaRepository.findAreasByCityId(cityId);
};

const getAreaById = async (id) => {
    const area = await areaRepository.findAreaById(id);
    if (!area) {
        throw new NotFound("Area not found");
    }
    return area;
};

module.exports = {
    createArea,
    updateArea,
    getAreasByCityId,
    getAreaById,
};
