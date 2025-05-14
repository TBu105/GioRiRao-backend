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
const verifyAccessToken = require("../middlewares/verify.access.token.middleware");
const authorize = require("../middlewares/authorize.middleware");

const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  authorize(["admin"]),
  validate(createStoreSchema),
  storeController.createStore
);
router.put(
  "/:id",
  verifyAccessToken,
  authorize(["admin", "storeManager"]),
  storeController.updateStore
);
router.put(
  "/:id/managerId",
  verifyAccessToken,
  authorize(["admin"]),
  validate(updateStoreManagerSchema),
  storeController.updateManager
);
router.put(
  "/:id/staffs",
  verifyAccessToken,
  validate(updateStaffSchema),
  storeController.updateStaff
);
router.delete(
  "/:id/staffs",
  verifyAccessToken,
  validate(deleteStaffsSchema),
  storeController.deleteStaff
);
router.get("/:id", verifyAccessToken, storeController.getStoreById);
router.get(
  "/area/:areaId",
  verifyAccessToken,
  storeController.getStoresByAreaId
);
router.get(
  "/staffs/:id",
  verifyAccessToken,
  storeController.getStaffsOfTheStore
);
router.post(
  "/manager/:storeId",
  verifyAccessToken,
  storeController.addManagerToStore
);
router.post(
  "/staff/:storeId",
  verifyAccessToken,
  storeController.addStaffToStore
);
router.patch(
  "/staffs/:storeId",
  verifyAccessToken,
  storeController.deleteStaff
);
router.patch(
  "/staffs/role/:storeId",
  verifyAccessToken,
  storeController.changeStaffRole
);
router.get(
  "/manager/:id",
  verifyAccessToken,
  storeController.getStoreByManagerId
);

module.exports = router;
