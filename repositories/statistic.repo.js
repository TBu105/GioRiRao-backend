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
  const storeRevenue = new StoreRevenue({
    storeId,
    revenue,
    day,
    month,
    year,
  });

  await storeRevenue.save();

  return storeRevenue;
};

const createStoreRevenueMonth = async ({ storeId, revenue, month, year }) => {
  const existing = await StoreRevenue.findOne({
    storeId,
    month,
    year,
    day: { $exists: false },
  });

  console.log("existing", existing);

  if (existing) {
    existing.revenue = revenue; // hoặc += revenue nếu cộng dồn
    await existing.save();
    return existing;
  } else {
    const newRevenue = new StoreRevenue({ storeId, revenue, month, year });
    await newRevenue.save();
    return newRevenue;
  }
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
    day: { $exists: true },
  });

  const revenues = storeRevenues.map((storeRevenue) => storeRevenue.revenue);

  console.log("revenues", revenues);

  const totalRevenue = revenues.reduce((acc, revenue) => acc + revenue, 0);

  console.log("totalRevenue", totalRevenue);

  return totalRevenue;
};

const getRevenueDayInRange = async ({ storeId, startDate, endDate }) => {
  // console.log("startDate", startDate);
  // console.log("endDate", endDate);
  // console.log("storeId", storeId);
  const storeRevenues = await StoreRevenue.find({
    storeId,
    createAt: {
      $gte: startDate,
      $lte: endDate,
    },
    day: { $exists: true },
  });

  // console.log("storeRevenues repo", storeRevenues);

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

  console.log("timeFrame", timeFrame);

  const result = await Order.aggregate([
    {
      $match: {
        storeId: new ObjectId(storeId),
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
        status: "COMPLETED",
        timeFrame,
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

  const existing = await StoreTopDrink.findOne({
    storeId,
    day,
    month,
    year,
    day: { $exists: true },
  });

  if (existing) {
    // Cập nhật lại topDrinks nếu đã có
    existing.topDrinks = result;
    await existing.save();
    console.log("Top drinks updated successfully!");
    return existing;
  } else {
    // Tạo mới nếu chưa có
    const topDrink = new StoreTopDrink({
      storeId,
      day,
      month,
      year,
      topDrinks: result,
    });

    await topDrink.save();
    console.log("Top drinks saved successfully!");
    return topDrink;
  }
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

  const existing = await StoreTopDrink.findOne({
    storeId,
    month,
    year,
    day: { $exists: false },
  });

  if (existing) {
    // Cập nhật lại topDrinks nếu đã có
    existing.topDrinks = aggregateResult;
    await existing.save();
    console.log("Top drinks updated successfully!");
    return existing;
  } else {
    // Tạo mới nếu chưa có
    const topDrink = new StoreTopDrink({
      storeId,
      month,
      year,
      topDrinks: aggregateResult,
    });

    await topDrink.save();
    console.log("Top drinks saved successfully!");
    return topDrink;
  }
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
  createStoreRevenueMonth,
};
