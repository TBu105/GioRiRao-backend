const cityService = require("../services/city.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");

const createCity = asyncHandler(async (req, res) => {
  const city = await cityService.createCity(req.body);
  res.status(HttpStatusCodes.CREATED.code).json({
    message: "City created successfully",
    city,
  });
});

const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCity = await cityService.updateCity(id, req.body);
  res.status(HttpStatusCodes.OK.code).json({
    message: "City updated successfully",
    updatedCity,
  });
});

const getAllCities = asyncHandler(async (req, res) => {
  const cities = await cityService.getAllCities();
  res.status(HttpStatusCodes.OK.code).json({
    message: "Retrieved all cities successfully",
    cities,
  });
});

const getCityById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const city = await cityService.getCityById(id);
  res.status(HttpStatusCodes.OK.code).json({
    message: `Retrieved city details successfully for ID: ${id}`,
    city,
  });
});

const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await cityService.deleteCity(id);
  res.status(HttpStatusCodes.OK.code).json({
    message: `City with ID: ${id} marked as deleted successfully`,
  });
});

module.exports = {
  createCity,
  updateCity,
  getAllCities,
  getCityById,
  deleteCity,
};
