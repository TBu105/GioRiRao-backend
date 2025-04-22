const express = require("express");
const validate = require("../middlewares/validation.middleware");
const verifyAccessToken = require("../middlewares/verify.access.token.middleware");
const authorize = require("../middlewares/authorize.middleware");
const statisticController = require("../controllers/statistic.controller");

const router = express.Router();

router.post("/revenue/day", statisticController.createRevenueByDate);

router.post("/revenue/month", statisticController.createRevenueByMonth);

router.post("/revenue/days-in-range", statisticController.getRevenueDayInRange);

router.post("/revenue/months", statisticController.getRevenueMonthOfYear);

// TOP DRINKS

router.get(
  "/topDrinks/day/:storeId/:day/:year",
  statisticController.getTopTenDrinksByDay
);

router.get(
  "/topDrinks/month/:storeId/:month/:year",
  statisticController.getTopTenDrinksByMonth
);

router.post(
  "/topDrinks/calculate/:timeType",
  statisticController.calculateTopTenDrinkByTimeType
);

module.exports = router;
