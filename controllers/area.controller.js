const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const areaService = require("../services/area.service");

const createArea = asyncHandler(async (req, res) => {
    const area = await areaService.createArea(req.body);
    res
        .status(HttpStatusCodes.CREATED.code)
        .json({ message: "Create area successfully", area });
});

const updateArea = asyncHandler(async (req, res) => {
    const updatedArea = await areaService.updateArea(req.params.id, req.body);
    res.status(HttpStatusCodes.OK.code).json({
        message: "Update area successfully",
        area: updatedArea,
    });
});

const getAreasByCityId = asyncHandler(async (req, res) => {
    const areas = await areaService.getAreasByCityId(req.params.cityId);
    res.status(HttpStatusCodes.OK.code).json({ areas });
});

const getAreaById = asyncHandler(async (req, res) => {
    const area = await areaService.getAreaById(req.params.id);
    res.status(HttpStatusCodes.OK.code).json({ area });
});

module.exports = {
    createArea,
    updateArea,
    getAreasByCityId,
    getAreaById,
};
