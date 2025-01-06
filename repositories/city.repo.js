const City = require("../models/City");

// Tạo thành phố mới
const createCity = async (cityData) => {
  const city = new City(cityData);
  return await city.save();
};

const findCityByName = async (name) => {
  return await City.findOne({ name }).lean();
};

const findCityById = async (id) => {
  return await City.findById(id, { deleted: false }).lean();
};

const findAllCities = async () => {
  return await City.find({ deleted: false }).lean();
};

const updateCityById = async (id, updateData) => {
  return await City.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  createCity,
  findCityByName,
  findCityById,
  findAllCities,
  updateCityById,
};
