const Store = require('../models/Store');

const create = async (data) => {
    return await Store.create(data);
};

const update = async (id, data) => {
    return await Store.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    );
};

const getById = async (id) => {
    return await Store.findOne({ _id: id, deleted: false })
        .populate('areaId', 'name')
        .populate('managerId', 'name');
};

const getAll = async () => {
    return await Store.find({ deleted: false })
        .populate('areaId', 'name')
        .populate('managerId', 'name');
};

const getAllByArea = async (areaId) => {
    return await Store.find({ areaId, deleted: false })
        .populate('areaId', 'name')
        .populate('managerId', 'name');
};

const softDelete = async (id) => {
    return await Store.findByIdAndUpdate(
        id,
        { deleted: true },
        { new: true }
    );
};

module.exports = {
    create,
    update,
    getById,
    getAll,
    getAllByArea,
    softDelete
};