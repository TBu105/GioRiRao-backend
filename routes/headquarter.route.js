const express = require("express");
const headquarterController = require("../controllers/headquarter.controller");
const validate = require("../middlewares/validate.middleware");
const headQuarterSchema = require("../validations/headquarter.schema");

const router = express.Router();

// Create a headquarter
router.post("/", validate(headQuarterSchema) ,headquarterController.createHeadquarter);

module.exports = router;
