const areaRepository = require("../repositories/area.repo");
const cityRepository = require("../repositories/city.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createArea = async (areaData) => {
    const cityExists = await cityRepository.findCityById(areaData.cityId);
    if (!cityExists) {
        throw new NotFound("City does not exist.");
    }
    return await areaRepository.createArea(areaData);
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
