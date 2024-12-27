const Area = require('../models/Area');

const create = async (data) => {
    return await Area.create(data);
};

const update = async (id, data) => {
    return await Area.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    );
};

const getById = async (id) => {
    return await Area.findOne({ _id: id, deleted: false })
        .populate('cityId', 'name')
        .populate('managerId', 'name');
};

const getAll = async () => {
    return await Area.find({ deleted: false })
        .populate('cityId', 'name')
        .populate('managerId', 'name');
};

const getAllByCity = async (cityId) => {
    return await Area.find({ cityId, deleted: false })
        .populate('cityId', 'name')
        .populate('managerId', 'name');
};

const softDelete = async (id) => {
    return await Area.findByIdAndUpdate(
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
    getAllByCity,
    softDelete
};

/**
 * Dữ liệu mẫu:
 * {
 *   name: 'District 1',
 *   cityId: sampleCity._id,
 *   managerId: sampleManager._id,
 *   totalStores: 30,
 *   deleted: false
 * }
 */