const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const statisticService = require("../services/statistic.service");

const createRevenueByDate = asyncHandler(async (req, res) => {
  const revenue = await statisticService.createRevenueByDate();

  return res.status(HttpStatusCodes.CREATED.code).json({
    message: revenue,
  });
});

const createRevenueByMonth = asyncHandler(async (req, res) => {
  const revenue = await statisticService.createRevenueByMonth();

  return res.status(HttpStatusCodes.CREATED.code).json({
    revenues: revenue,
  });
});

const getRevenueDayInRange = asyncHandler(async (req, res) => {
  console.log("req.body.storeId", req.body.storeId);
  console.log("req.body.fromDate", req.body.fromDate);
  console.log("req.body.toDate", req.body.toDate);

  const revenueDayOfWeek = await statisticService.getRevenueDayInRange(
    req.body.storeId,
    req.body.fromDate,
    req.body.toDate
  );

  return res.status(HttpStatusCodes.OK.code).json({
    revenues: revenueDayOfWeek,
  });
});

const getRevenueMonthOfYear = asyncHandler(async (req, res) => {
  const revenueMonthOfYear = await statisticService.getRevenueMonthOfYear(
    req.body.storeId,
    req.body.year
  );

  return res.status(HttpStatusCodes.OK.code).json({
    revenues: revenueMonthOfYear,
  });
});

// TOP DRINK

const calculateTopTenDrinkByTimeType = asyncHandler(async (req, res) => {
  const topDrinks = await statisticService.calculateTopTenDrinkByTimeType(
    req.params.timeType
  );

  return res.status(HttpStatusCodes.CREATED.code).json({
    drinks: topDrinks,
  });
});

const getTopTenDrinksByDay = asyncHandler(async (req, res) => {
  const topDrinks = await statisticService.getTopTenDrinksByDay(
    req.params.storeId,
    req.params.day,
    req.params.year
  );

  return res.status(HttpStatusCodes.OK.code).json({
    drinks: topDrinks || [],
  });
});

const getTopTenDrinksByMonth = asyncHandler(async (req, res) => {
  const topDrinks = await statisticService.getTopTenDrinksByMonth(
    req.params.storeId,
    req.params.month,
    req.params.year
  );

  return res.status(HttpStatusCodes.OK.code).json({
    drinks: topDrinks || [],
  });
});

module.exports = {
  getRevenueMonthOfYear,
  getTopTenDrinksByDay,
  getTopTenDrinksByMonth,
  getRevenueDayInRange,
  createRevenueByDate,
  createRevenueByMonth,
  calculateTopTenDrinkByTimeType
};
