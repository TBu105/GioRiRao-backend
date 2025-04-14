const express = require("express");
const staffController = require("../controllers/staff.controller");
const { uploadDisk } = require("../config/multer.config");
const router = express.Router();

router.get("/:id", staffController.getStaffById);
router.get("/", staffController.getAllStaff);
router.post("/", uploadDisk.single("avatar"), staffController.createStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
