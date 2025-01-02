const Area = require("../models/Area");

const createArea = async (areaData) => {
    const area = new Area(areaData);
    return await area.save();
};

const updateArea = async (id, updateData) => {
    return await Area.findByIdAndUpdate(id, updateData, { new: true });
};

const findAreasByCityId = async (cityId) => {
    return await Area.find({ cityId, deleted: false });
};

const findAreaById = async (id) => {
    return await Area.findById(id);
};

module.exports = {
    createArea,
    updateArea,
    findAreasByCityId,
    findAreaById,
};