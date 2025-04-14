const express = require("express");
const validate = require("../middlewares/validation.middleware");
const storeController = require("../controllers/store.controller");
const {
  createStoreSchema,
  updateStoreManagerSchema,
  updateStaffSchema,
  deleteStaffsSchema,
} = require("../validations/store.validation");

const router = express.Router();

router.post("/", validate(createStoreSchema), storeController.createStore);
router.patch("/:id", storeController.updateStore);
router.get("/:id", storeController.getStoreById);
router.put(
  "/:id/managerId",
  validate(updateStoreManagerSchema),
  storeController.updateManager
);
router.put(
  "/:id/staffs",
  validate(updateStaffSchema),
  storeController.updateStaff
);
router.delete(
  "/:id/staffs",
  validate(deleteStaffsSchema),
  storeController.deleteStaff
);
router.get("/area/:areaId", storeController.getStoresByAreaId);

module.exports = router;
