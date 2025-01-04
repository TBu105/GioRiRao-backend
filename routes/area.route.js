const express = require("express");
const areaController = require("../controllers/area.controller");
const validate = require("../middlewares/validation.middleware");
const { createAreaSchema, updateAreaOtherFieldsSchema } = require("../validations/area.validation");

const router = express.Router();
router.post("/:cityId", validate(createAreaSchema), areaController.createArea);
router.put("/:id", validate(updateAreaOtherFieldsSchema), areaController.updateArea);
router.get("/by-city/:cityId", areaController.getAreasByCityId);
router.get("/:id", areaController.getAreaById);

module.exports = router;
