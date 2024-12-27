const express = require("express");
const {
    createHeadquarter,
    updateHeadquarter,
    getHeadquarterById,
    deleteHeadquarter
} = require("../controllers/headquarter.controller");
const validate = require("../middlewares/validate.middleware");
const headQuarterSchema = require("../validations/headquarter.schema");

const router = express.Router();

// Create a headquarter
router.post("/", validate(headQuarterSchema), createHeadquarter);
router.put("/:id", updateHeadquarter);
router.get("/:id", getHeadquarterById);
router.delete("/:id", deleteHeadquarter);

module.exports = router;
