const cron = require("node-cron");
const statisticService = require("../services/statistic.service");
const moment = require("moment");
const { spawn } = require("child_process");
const path = require("path");

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

const createPredictRevenueModel = async () => {
  const dataFromDB = await statisticService.getRevenueDayInRange(
    req.body.storeId,
    req.body.fromDate,
    req.body.toDate
  );

  return new Promise((resolve, reject) => {
    const pyProcess = spawn(
      path.join(__dirname, "../ai/venv/Scripts/python.exe"),
      [path.join(__dirname, "../ai/train_model.py")]
    );

    let result = "";
    let error = "";

    // Lắng nghe output từ Python
    pyProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pyProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pyProcess.on("close", (code) => {
      if (code !== 0 || error) {
        return reject(new Error(`Python error: ${error}`));
      }
      try {
        const parsed = JSON.parse(result);
        resolve(parsed);
      } catch (err) {
        reject(new Error(`Parse error: ${err.message}`));
      }
    });

    // Gửi JSON vào stdin của Python
    pyProcess.stdin.write(JSON.stringify(dataFromDB));
    pyProcess.stdin.end();
  });
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

module.exports = { setupCronJobs, createPredictRevenueModel };
