const express = require("express");
const { createCity, updateCity, getCityById, getAllCities, getCitiesByHeadquarter, deleteCity } = require("../controllers/city.controller");
const validate = require("../middlewares/validate.middleware");
const citySchema = require("../validations/city.schema");

const router = express.Router();

router.post("/", validate(citySchema), createCity);
router.put("/:id", updateCity);
router.get("/", getAllCities);
router.get("/:id", getCityById);
router.get("/headquarter/:headquarterId", getCitiesByHeadquarter);
router.delete("/:id", deleteCity);

module.exports = router; 