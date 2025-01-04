const express = require("express");
const validate = require("../middlewares/validation.middleware");
const storeController = require("../controllers/store.controller");
const { createStoreSchema, updateStoreSchema, updateStoreManagerSchema } = require("../validations/store.validation");

const router = express.Router();

router.post("/:areaId", validate(createStoreSchema), storeController.createStore);
router.put("/:id", validate(updateStoreSchema), storeController.updateStore);
router.put("/:id/staffs", validate(updateStoreManagerSchema), storeController.updateStaff);
router.get("/area/:areaId", storeController.getStoresByAreaId);

module.exports = router;
