const express = require("express");
const router = express.Router();

router.use("/cities", require("./city.route"));
router.use("/areas", require("./area.route"));
router.use("/stores", require("./store.route"));
router.use("/auth", require("./auth.route"));
router.use("/toppings", require("./topping.route"));
router.use("/drinks", require("./drink.route"));
router.use("/orders", require("./order.route"));
router.use("/staffs", require("./staff.route"));
router.use("/statistics", require("./statistic.route"));

module.exports = router;
