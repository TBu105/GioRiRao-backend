const express = require("express");
const router = express.Router();

router.use("/city", require("./city.route"));
router.use("/area", require("./area.route"));
router.use("/store", require("./store.route"))
router.use("/auth", require("./auth.route"));

module.exports = router;
