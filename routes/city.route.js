const express = require("express");
const cityController = require("../controllers/city.controller");
const validate = require("../middlewares/validation.middleware");
const { createCitySchema, updateCityOtherFieldsSchema } = require("../validations/city.validation");

const router = express.Router();

router.post("/", validate(createCitySchema), cityController.createCity);
router.put("/:id", validate(updateCityOtherFieldsSchema), cityController.updateCity);
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);
router.delete("/:id", cityController.deleteCity);

module.exports = router;