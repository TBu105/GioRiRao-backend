const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const areaService = require("../services/area.service");

const createArea = asyncHandler(async (req, res) => {
    const { cityId } = req.params;
    const areaData = { ...req.body, cityId };
    const area = await areaService.createArea(areaData);
    return res.status(HttpStatusCodes.CREATED.code).json({
        message: "Area created successfully",
        area,
    });
});

const updateArea = asyncHandler(async (req, res) => {
    const updatedArea = await areaService.updateArea(req.params.id, req.body);
    return res.status(HttpStatusCodes.OK.code).json({
        message: "Area updated successfully",
        updatedArea,
    });
});

const getAreasByCityId = asyncHandler(async (req, res) => {
    const areas = await areaService.getAreasByCityId(req.params.cityId);
    return res.status(HttpStatusCodes.OK.code).json({
        message: `Retrieved all areas successfully for City ID: ${req.params.cityId}`,
        areas,
    });
});

const getAreaById = asyncHandler(async (req, res) => {
    const area = await areaService.getAreaById(req.params.id);
    return res.status(HttpStatusCodes.OK.code).json({
        message: `Retrieved area details successfully for ID: ${req.params.id}`,
        area,
    });
});

module.exports = {
    createArea,
    updateArea,
    getAreasByCityId,
    getAreaById,
};
