const cron = require("node-cron");
const statisticService = require("../services/statistic.service");
const moment = require("moment");

const checkAndCalculateShiftRevenue = async () => {
  console.log(`Running shift revenue calculation at`);
  await statisticService.createRevenueByDate();
};

const checkAndCalculateMonthRevenue = async () => {
  const today = moment();
  const endOfMonth = moment().endOf("month");

  if (today.isSame(endOfMonth, "day")) {
    console.log(
      `✅ Hôm nay (${today.format("YYYY-MM-DD")}) là ngày cuối cùng của tháng`
    );
    // Gọi API thống kê tháng, hoặc logic cleanup dữ liệu

    await statisticService.createRevenueByMonth();
  } else {
    console.log(
      `📅 Hôm nay (${today.format("YYYY-MM-DD")}) KHÔNG phải là ngày cuối tháng`
    );
  }
};

const setupCronJobs = () => {
  console.log("⏰ Setting up cron jobs...");

  // Shift revenue - daily at specific hours
  cron.schedule("1 11 * * *", checkAndCalculateShiftRevenue);
  cron.schedule("1 15 * * *", checkAndCalculateShiftRevenue);
  cron.schedule("1 19 * * *", checkAndCalculateShiftRevenue);
  cron.schedule("1 23 * * *", checkAndCalculateShiftRevenue);

  cron.schedule("0 0 * * *", () => checkAndCalculateMonthRevenue);
};

module.exports = setupCronJobs;
