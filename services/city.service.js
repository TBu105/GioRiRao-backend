const cityRepository = require("../repositories/city.repo");
const { BadRequest } = require("../config/error.response.config");

const createCity = async (cityData) => {
  // Check if a city with the same name already exists
  const existingCity = await cityRepository.findCityByName(cityData.name);
  console.log(existingCity);
  if (existingCity) {
    throw new BadRequest("City with this name already exists.");
  }
  // Create the new city
  return await cityRepository.createCity(cityData);
};

module.exports = {
  createCity,
};
