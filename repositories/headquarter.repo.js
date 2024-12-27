const Headquarter = require('../models/Headquarter');

const create = async (data) => {
  return await Headquarter.create(data);
};

const update = async (id, data) => {
  return await Headquarter.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
};

const getById = async (id) => {
  return await Headquarter.findOne({ _id: id, deleted: false });
};

const getAll = async () => {
  return await Headquarter.find({ deleted: false });
};

const softDelete = async (id) => {
  return await Headquarter.findByIdAndUpdate(
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
  softDelete
};
