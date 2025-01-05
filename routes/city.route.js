const express = require("express");
const cityController = require("../controllers/city.controller");
const validate = require("../middlewares/validation.middleware");
const { createCitySchema } = require("../validations/city.validation");

const router = express.Router();

// Create a new city
router.post("/", validate(createCitySchema), cityController.createCity);

module.exports = router;
