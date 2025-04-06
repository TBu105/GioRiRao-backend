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

router.post(
  "/:areaId",
  validate(createStoreSchema),
  storeController.createStore
);
router.put("/:id", validate(updateStoreSchema), storeController.updateStore);
router.delete(
  "/staff/:id",
  validate(deleteStaffsSchema),
  storeController.deleteStaff
);
router.get("/area/:areaId", storeController.getStoresByAreaId);
router.get("/staffs/:id", storeController.getStaffsOfTheStore);
router.post("/manager/:storeId", storeController.addManagerToStore);
router.post("/staff/:storeId", storeController.addStaffToStore);
router.patch("/staffs/:storeId", storeController.deleteStaff);
router.patch("/staffs/role/:storeId", storeController.changeStaffRole);

module.exports = router;
