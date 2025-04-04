const express = require("express");
const orderController = require("../controllers/order.controller");
const {} = require("../validations/order.validation");

const router = express.Router();

router.post("/", orderController.createOrder);

router.patch("/:id", orderController.updateOrderStatusToComplete);

router.get("/pending-orders/:storeId", orderController.getPendingOrdersByStoreandDate);

module.exports = router;
