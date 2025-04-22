const express = require("express");
const router = express.Router();
const { uploadDisk } = require("../config/multer.config");
const inventoryController = require("../controllers/inventory.controller");

router.post(
  "/import/:storeId",
  uploadDisk.single("file"),
  inventoryController.importInGoods
);

router.get("/import/:storeId", inventoryController.findInventoryByStore);

module.exports = router;
