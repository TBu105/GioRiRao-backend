const express = require("express");
const router = express.Router();
const { asyncHandler } = require('../middlewares/async.handler');
const { createStore, updateStore, getStoreById, getAllStores, getStoresByArea, deleteStore } = require("../controllers/store.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const { storeSchema } = require("../validations/store.schema");

router.post("/", validateSchema(storeSchema), asyncHandler(createStore));
router.put("/:id", validateSchema(storeSchema), asyncHandler(updateStore));
router.get("/", asyncHandler(getAllStores));
router.get("/:id", asyncHandler(getStoreById));
router.get("/area/:areaId", asyncHandler(getStoresByArea));
router.delete("/:id", asyncHandler(deleteStore));

module.exports = router; 