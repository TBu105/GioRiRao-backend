const express = require("express");
const router = express.Router();

router.use("/city", require("./city.route"));
router.use("/area", require("./area.route"));
router.use("/store", require("./store.route"));
router.use("/auth", require("./auth.route"));
router.use("/topping", require("./topping.route"));
router.use("/order", require("./order.route"));

module.exports = router;
