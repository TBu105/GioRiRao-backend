const express = require("express");
const { createArea, updateArea, getAreaById, getAllAreas, getAreasByCity, deleteArea } = require("../controllers/area.controller");
const validate = require("../middlewares/validate.middleware");
const areaSchema = require("../validations/area.schema");

const router = express.Router();

router.post("/", validate(areaSchema), createArea);
router.put("/:id", updateArea);
router.get("/", getAllAreas);
router.get("/:id", getAreaById);
router.get("/city/:cityId", getAreasByCity);
router.delete("/:id", deleteArea);

module.exports = router; 