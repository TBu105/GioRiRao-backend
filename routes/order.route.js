const express = require("express");
const orderController = require("../controllers/order.controller");
const {} = require("../validations/order.validation");

const router = express.Router();

router.post(
  "/",
  orderController.createOrder
);

module.exports = router;
