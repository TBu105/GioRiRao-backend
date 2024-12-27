const City = require('../models/City');

const create = async (data) => {
    return await City.create(data);
};

const update = async (id, data) => {
    return await City.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    );
};

const getById = async (id) => {
    return await City.findOne({ _id: id, deleted: false })
        .populate('headquarterId', 'name')
        .populate('managerId', 'name');
};

const getAll = async () => {
    return await City.find({ deleted: false })
        .populate('headquarterId', 'name')
        .populate('managerId', 'name');
};

const getAllByHeadquarter = async (headquarterId) => {
    return await City.find({ headquarterId, deleted: false })
        .populate('headquarterId', 'name')
        .populate('managerId', 'name');
};

const softDelete = async (id) => {
    return await City.findByIdAndUpdate(
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
    getAllByHeadquarter,
    softDelete
};