const express = require("express");
const validate = require("../middlewares/validation.middleware");
const storeController = require("../controllers/store.controller");
const {
  createStoreSchema,
  updateStoreSchema,
  updateStoreManagerSchema,
  updateStaffSchema,
  deleteStaffsSchema,
} = require("../validations/store.validation");

const router = express.Router();

router.post("/", validate(createStoreSchema), storeController.createStore);
router.put("/:id", storeController.updateStore);
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
router.get("/:id", storeController.getStoreById);
router.get("/area/:areaId", storeController.getStoresByAreaId);
router.get("/staffs/:id", storeController.getStaffsOfTheStore);
router.post("/manager/:storeId", storeController.addManagerToStore);
router.post("/staff/:storeId", storeController.addStaffToStore);
router.patch("/staffs/:storeId", storeController.deleteStaff);
router.patch("/staffs/role/:storeId", storeController.changeStaffRole);

module.exports = router;
