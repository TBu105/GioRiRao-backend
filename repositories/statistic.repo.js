const StoreRevenue = require("../models/StoreRevenue");
const Order = require("../models/Order");
const StoreTopDrink = require("../models/StoreTopDrinks");
const moment = require("moment");
const { ObjectId } = require("mongodb");

const getStoreRevenueToday = async ({ storeId, day, month, year }) => {
  const storeRevenue = await StoreRevenue.find({
    storeId,
    day,
    month,
    year,
  });

  return storeRevenue;
};

const createStoreRevenue = async ({ storeId, revenue, day, month, year }) => {
  console.log("currentDay repo", day);
  console.log("currentMonth repo", month);
  console.log("currentYear repo", year);
  const storeRevenue = new StoreRevenue({
    storeId,
    revenue,
    day,
    month,
    year,
  });

  await storeRevenue.save();

  console.log("storeRevenue repo", storeRevenue);

  return storeRevenue;
};

const updateStoreRevenue = async ({ storeId, revenue, date }) => {
  // Convert date string or object to start and end of that day
  const inputDate = new Date(date);

  const startOfDay = new Date(
    Date.UTC(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  const endOfDay = new Date(
    Date.UTC(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

  // Define filter: match storeId and date within the day range
  const filter = {
    storeId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  };

  const storeRevenue = await StoreRevenue.findOneAndUpdate(
    filter,
    { revenue },
    { new: true } // return the updated document
  );

  return storeRevenue;
};

const calculateRevenueAMonth = async ({ storeId }) => {
  const now = new Date();

  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth(); // (0-11)

  const startOfMonth = new Date(
    Date.UTC(currentYear, currentMonth, 1, 0, 0, 0, 0)
  );
  const endOfMonth = new Date(
    Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59, 999)
  );

  const storeRevenues = await StoreRevenue.find({
    storeId,
    createdAt: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  });

  const revenues = storeRevenues.map((storeRevenue) => storeRevenue.revenue);

  const totalRevenue = revenues.reduce((acc, revenue) => acc + revenue, 0);

  return totalRevenue;
};

const getRevenueDayInRange = async ({ storeId, startDate, endDate }) => {

  const storeRevenues = await StoreRevenue.find({
    storeId,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
    day: { $exists: true },
  });

  return storeRevenues;
};

const getStoreRevenueMonthOfYear = async ({ storeId, year }) => {
  const storeRevenues = await StoreRevenue.find({
    storeId,
    year,
    day: { $exists: false },
  });

  return storeRevenues;
};

const createTopTenDrinksByDate = async ({
  storeId,
  day,
  month,
  year,
  timeFrame,
}) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(today);
  endDate.setUTCHours(23, 59, 59, 999);

  const result = await Order.aggregate([
    {
      $match: {
        storeId: new ObjectId(storeId),
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
        status: "COMPLETED",
        timeFrame: 2,
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.drinkId",
        totalQuantity: { $sum: "$items.quantity" },
        drinkName: { $first: "$items.drinkName" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 10 },
    {
      $project: {
        drinkId: "$_id",
        totalQuantity: 1,
        drinkName: 1,
        _id: 0,
      },
    },
  ]);

  console.log("Top drinks result:", result);

  const topDrink = new StoreTopDrink({
    storeId,
    day,
    month,
    year,
    topDrinks: result,
  });

  return await topDrink
    .save()
    .then(() => {
      console.log("Top drinks saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving top drinks:", error);
    });
};

const createTopTenDrinksByMonth = async ({ storeId, month, year }) => {
  const aggregateResult = await StoreTopDrink.aggregate([
    {
      $match: {
        storeId: new ObjectId(storeId),
        month,
        year,
      },
    },
    { $unwind: "$topDrinks" },
    {
      $group: {
        _id: "$topDrinks.drinkId",
        totalQuantity: { $sum: "$topDrinks.totalQuantity" },
        drinkName: { $first: "$topDrinks.drinkName" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 10 },
    {
      $project: {
        drinkId: "$_id",
        totalQuantity: 1,
        drinkName: 1,
        _id: 0,
      },
    },
  ]);

  console.log("Top drinks by month result:", aggregateResult);

  const topDrink = new StoreTopDrink({
    storeId,
    month,
    year,
    topDrinks: aggregateResult,
  });

  return await topDrink
    .save()
    .then(() => {
      console.log("Top drinks by month saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving top drinks by month:", error);
    });
};

const getTopTenDrinksByDay = async ({ storeId, day, year }) => {
  try {
    const result = await StoreTopDrink.find({
      storeId: storeId,
      day: day,
      year: year,
    }).lean();

    return result.length > 0 ? result[0].topDrinks : [];
  } catch (error) {
    console.error("Error fetching top drinks by day:", error);
    return [];
  }
};

const getTopTenDrinksByMonth = async ({ storeId, month, year }) => {
  try {
    const result = await StoreTopDrink.find({
      storeId: storeId,
      month: month,
      year: year,
      day: { $exists: false },
    }).lean();

    return result.length > 0 ? result[0].topDrinks : [];
  } catch (error) {
    console.error("Error fetching top drinks by month:", error);
    return [];
  }
};

module.exports = {
  getStoreRevenueToday,
  createStoreRevenue,
  updateStoreRevenue,
  calculateRevenueAMonth,
  createTopTenDrinksByDate,
  getStoreRevenueMonthOfYear,
  createTopTenDrinksByMonth,
  getTopTenDrinksByDay,
  getTopTenDrinksByMonth,
  getRevenueDayInRange,
};
