const express = require("express");
const router = express.Router();
const headquarterRoute = require('./headquarter.route');
const cityRoute = require('./city.route');
const areaRoute = require('./area.route');
const storeRoute = require('./store.route');

router.use("/headquarter", headquarterRoute);
router.use("/city", cityRoute);
router.use("/area", areaRoute);
router.use("/store", storeRoute);

module.exports = router;
