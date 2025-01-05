const cityService = require("../services/city.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");

const createCity = asyncHandler(async (req, res) => {
  const city = await cityService.createCity(req.body);
  res
    .status(HttpStatusCodes.CREATED.code)
    .json({ message: "Create city successfully", city });
});

module.exports = {
  createCity,
};
