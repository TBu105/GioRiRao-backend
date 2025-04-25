const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
// const pythonPath = "ai\\venv\\Scripts\\python.exe";
const statisticService = require("../services/statistic.service");
const { spawn } = require("child_process");
const path = require("path");
const WeightForRevenuePredict = require("../models/WeightForRevenuePredict");
const storeRepository = require("../repositories/store.repo");
const RevenuePredict = require("../models/RevenuePredict");
const moment = require("moment");

const pythonPath = path.join(__dirname, "../ai/venv/Scripts/python.exe");

const trainModelPredictRevenue = asyncHandler(async (req, res) => {
  const currentMonth = moment();

  // Ngày đầu tháng hiện tại
  const fromDate = currentMonth.startOf("month").format("YYYY/MM/DD");

  // Ngày cuối tháng hiện tại
  const toDate = currentMonth.endOf("month").format("YYYY/MM/DD");

  const storeIds = await storeRepository.getAllStoreId();

  const results = [];

  for (const storeId of storeIds) {
    const dataFromDB = await statisticService.getRevenueDayInRange(
      storeId,
      fromDate,
      toDate
    );

    if (!dataFromDB || dataFromDB.length === 0) {
      console.warn(`No data found for store ${storeId}`);
      continue;
    }

    const weights = await new Promise((resolve, reject) => {
      const pyProcess = spawn(pythonPath, [
        path.join(__dirname, "../ai/train_model.py"),
      ]);

      let result = "";
      let error = "";

      pyProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pyProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      pyProcess.on("close", (code) => {
        if (code !== 0 || error) {
          console.error(`Python error for store ${storeId}:`, error);
          return reject(new Error(`Python error: ${error}`));
        }

        try {
          const parsed = JSON.parse(result);
          resolve(parsed.weights); // <-- chỉ lấy mảng weights
        } catch (err) {
          reject(new Error(`Parse error: ${err.message}`));
        }
      });

      pyProcess.stdin.write(JSON.stringify(dataFromDB));
      pyProcess.stdin.end();
    });

    await WeightForRevenuePredict.findOneAndUpdate(
      { storeId },
      { weights },
      { upsert: true, new: true }
    );

    results.push({ storeId, weights });
  }

  res.json({
    message: "Model trained and saved for all stores",
    results,
  });
});

const predictRevenue = asyncHandler(async (req, res) => {
  // Lấy tháng hiện tại + 1
  const nextMonth = moment().add(1, "month");

  // Lấy số ngày trong tháng đó
  const daysInMonth = nextMonth.daysInMonth();

  // Lấy số tháng (1-12)
  const monthNumber = nextMonth.month() + 1; // vì moment().month() trả về 0-11

  // Tạo dữ liệu futureData
  const futureData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    month: monthNumber,
  }));

  const storeIds = await storeRepository.getAllStoreId(); // trả về array ObjectId

  const results = [];

  for (const storeId of storeIds) {
    const weightDB = await WeightForRevenuePredict.findOne({ storeId });

    if (!weightDB) {
      console.warn(`No weights found for store ${storeId}`);
      continue;
    }

    const input_data = {
      weights: weightDB.weights,
      future_data: futureData,
    };

    const prediction = await new Promise((resolve, reject) => {
      const pyProcess = spawn(pythonPath, [
        path.join(__dirname, "../ai/predict.py"),
      ]);

      let result = "";
      let error = "";

      pyProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pyProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      pyProcess.on("close", async (code) => {
        if (code !== 0 || error) {
          console.error(`Prediction failed for store ${storeId}:`, error);
          return reject(`Python error for store ${storeId}`);
        }

        try {
          const predictedRevenues = JSON.parse(result);
          // ✅ update or insert (upsert)
          await RevenuePredict.findOneAndUpdate(
            { storeId },
            { predictedRevenues },
            { upsert: true, new: true }
          );
          resolve({ storeId, predictedRevenues });
        } catch (err) {
          console.error(`Error saving prediction for store ${storeId}:`, err);
          reject(`Saving failed for store ${storeId}`);
        }
      });

      pyProcess.stdin.write(JSON.stringify(input_data));
      pyProcess.stdin.end();
    });

    results.push(prediction);
  }

  res.json({
    message: "Predictions generated and saved for all stores",
    results,
  });
});

const getPredictedRevenue = asyncHandler(async (req, res) => {
  const predictedRevenue = await RevenuePredict.findOne({
    storeId: req.params.storeId,
  });

  res.status(HttpStatusCodes.OK.code).json({
    predictedRevenue,
  });
});

module.exports = {
  trainModelPredictRevenue,
  predictRevenue,
  getPredictedRevenue,
};
