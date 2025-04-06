const express = require("express");
const staffController = require("../controllers/staff.controller");
const validate = require("../middlewares/validation.middleware");

const router = express.Router();

router.get("/:staffId", staffController.getStaffInfoById);
router.patch("/:staffId", staffController.updateStaffById);

module.exports = router;
