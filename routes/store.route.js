const express = require("express");
const { createStore, updateStore, getStoreById, getAllStores, getStoresByArea, deleteStore } = require("../controllers/store.controller");
const validate = require("../middlewares/validate.middleware");
const storeSchema = require("../validations/store.schema");

const router = express.Router();

router.post("/", validate(storeSchema), createStore);
router.put("/:id", updateStore);
router.get("/", getAllStores);
router.get("/:id", getStoreById);
router.get("/area/:areaId", getStoresByArea);
router.delete("/:id", deleteStore);

module.exports = router; 