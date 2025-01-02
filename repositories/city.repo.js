const City = require("../models/City");

const createCity = async (cityData) => {
  const city = new City(cityData);
  return await city.save();
};

const findCityByName = async (name) => {
  return await City.findOne({ name });
};

const findCityById = async (id) => {
  return await City.findById(id);
};

const findAllCities = async () => {
  return await City.find({ deleted: false });
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