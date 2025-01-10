const express = require("express");
const cityController = require("../controllers/city.controller");
const validate = require("../middlewares/validation.middleware");
const {
  createCitySchema,
  createCitiesSchema,
  updateCityOtherFieldsSchema,
} = require("../validations/city.validation");

const router = express.Router();

router.post("/", validate(createCitySchema), cityController.createCity);
router.post(
  "/bulk",
  validate(createCitiesSchema),
  cityController.createCitiesInBulk
);
router.put("/:id", validate(updateCityOtherFieldsSchema), cityController.updateCity);
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);

module.exports = router;