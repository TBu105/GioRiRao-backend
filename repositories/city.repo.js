const City = require("../models/City");

const createCity = async (cityData) => {
  const city = new City(cityData);
  return await city.save();
};

const findCityByName = async (name) => {
  return await City.findOne({name})
}

module.exports = {
  createCity,
  findCityByName,
};
