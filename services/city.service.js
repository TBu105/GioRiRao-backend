const cityRepository = require("../repositories/city.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createCity = async (cityData) => {
  const existingCity = await cityRepository.findCityByName(cityData.name);
  if (existingCity) {
    throw new BadRequest("City with this name already exists.");
  }
  return await cityRepository.createCity(cityData);
};

const updateCity = async (id, updateData) => {
  if (updateData.hasOwnProperty("deleted")) {
    throw new BadRequest("The 'deleted' field cannot be updated directly.");
  }
  const updatedCity = await cityRepository.updateCityById(id, updateData);
  if (!updatedCity) {
    throw new NotFound("City not found.");
  }
  return updatedCity;
};

const getAllCities = async () => {
  return await cityRepository.findAllCities();
};

const getCityById = async (id) => {
  const city = await cityRepository.findCityById(id);
  if (!city) {
    throw new NotFound("City not found.");
  }
  return city;
};

module.exports = {
  createCity,
  updateCity,
  getAllCities,
  getCityById,
};