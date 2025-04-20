const statisticRepository = require("../repositories/statistic.repo");
const storeRepository = require("../repositories/store.repo");
const orderRepository = require("../repositories/order.repo");
const checkOrderTimeFrame = require("../utils/check.order.time.frame.util");
const moment = require("moment");

// REVENUE

const createRevenueByDate = async () => {
  const timeFrame = checkOrderTimeFrame("statistic");
  const date = new Date(); // hoặc dùng moment.js nếu bạn đã xài
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const storeIds = await storeRepository.getAllStoreId();

  await Promise.all(
    storeIds.map(async (storeId) => {
      const storeRevenue = await statisticRepository.getStoreRevenueToday({
        storeId,
        day,
        month,
        year,
      });

      const revenueByTimeFrame = await orderRepository.calculateRevenueByShift(
        storeId,
        date,
        timeFrame
      );

      const revenue =
        storeRevenue.length !== 0
          ? storeRevenue[0].revenue + revenueByTimeFrame
          : revenueByTimeFrame;

      if (storeRevenue.length !== 0) {
        await statisticRepository.updateStoreRevenue({
          storeId,
          revenue,
          date,
        });
      } else {
        await statisticRepository.createStoreRevenue({
          storeId,
          revenue,
          day,
          month,
          year,
        });
      }
    })
  );

  return "CREATE REVENUE BY DATE SUCCESSFULLY";
};

const createRevenueByMonth = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0-11

  const storeIds = await storeRepository.getAllStoreId();

  await Promise.all(
    storeIds.map(async (storeId) => {
      const revenue = await statisticRepository.calculateRevenueAMonth({
        storeId,
      });

      await statisticRepository.createStoreRevenue({
        storeId,
        revenue,
        month,
        year,
      });
    })
  );
  return "CREATE REVENUE BY MONTH SUCCESSFULLY";
};

const getRevenueDayInRange = async (storeId, startDate, endDate) => {
  const revenues = await statisticRepository.getRevenueDayInRange({
    storeId,
    startDate,
    endDate,
  });

  return revenues;
};

const getRevenueMonthOfYear = async (storeId, year) => {
  const revenues = await statisticRepository.getStoreRevenueMonthOfYear({
    storeId,
    year,
  });

  return revenues;
};

//TOP DRINK

const createTopTenDrinksByDate = async (
  storeId,
  day,
  month,
  year,
  timeFrame
) => {
  const topTen = await statisticRepository.createTopTenDrinksByDate({
    storeId,
    day,
    month,
    year,
    timeFrame,
  });

  return topTen;
};

const createTopTenDrinksByMonth = async (storeId, month, year) => {
  const topTen = await statisticRepository.createTopTenDrinksByMonth({
    storeId,
    month,
    year,
  });

  return topTen;
};

const calculateTopTenDrinkByTimeType = async (timeType) => {
  const storeIds = await storeRepository.getAllStoreId();
  const now = moment(); // lấy thời gian hiện tại
  const day = now.date(); // Ngày trong tháng (1-31)
  const month = now.month() + 1; // Tháng (0-11 → nên cộng thêm 1)
  const year = now.year(); // Năm (vd: 2025)
  const timeFrame = checkOrderTimeFrame("statistic");

  if (timeType === "day") {
    await Promise.all(
      storeIds.map((storeId) =>
        createTopTenDrinksByDate(storeId, day, month, year, timeFrame)
      )
    );
  } else if (timeType === "month") {
    await Promise.all(
      storeIds.map((storeId) => createTopTenDrinksByMonth(storeId, month, year))
    );
  } else {
    throw new Error("Invalid time type. Please choose day or month.");
  }

  return "Calculate top ten drinks of all store successfully!";
};

const getTopTenDrinksByDay = async (storeId, day, year) => {
  const topDrinks = await statisticRepository.getTopTenDrinksByDay({
    storeId,
    day,
    year,
  });

  return topDrinks || [];
};

const getTopTenDrinksByMonth = async (storeId, month, year) => {
  const topDrinks = await statisticRepository.getTopTenDrinksByMonth({
    storeId,
    month,
    year,
  });

  return topDrinks || [];
};

module.exports = {
  createRevenueByDate,
  createRevenueByMonth,
  calculateTopTenDrinkByTimeType,
  getRevenueDayInRange,
  getRevenueMonthOfYear,
  getTopTenDrinksByDay,
  getTopTenDrinksByMonth,
};
