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
const { start } = require("repl");
const StoreRevenue = require("../models/StoreRevenue");
const { stringify } = require("querystring");

const pythonPath = path.join(__dirname, "../ai/venv/Scripts/python.exe");

const updateCreatedAt = async (storeId) => {
  const storeRevenue = await StoreRevenue.find({
    storeId,
    day: { $exists: true },
  });

  for (let i = 0; i < storeRevenue.length; i++) {
    let month = storeRevenue[i].month; // 5
    if (month < 10) {
      month = "0" + month; // 05
      // console.log("month", month);
      // console.log("month", typeof month);
    }

    let day = storeRevenue[i].day; // 5
    if (day < 10) {
      day = "0" + day; // 05
      // console.log("day", day);
      // console.log("day", typeof day);
    }

    let text = JSON.stringify(storeRevenue[i].createdAt); // 2025-05-05T08:21:10.991Z
    // console.log("text", text);

    const splitB = text.split('"');
    let created = splitB[1].split("T");
    // console.log("created", created);

    let format = created[0].split("-");
    // console.log("format before", format);

    format[1] = month;
    format[2] = day;
    // console.log("format month", format[1]);
    // console.log("format day", format[2]);
    // console.log("format after", format);

    format = format.join("-");
    created = format + "T" + created[1];
    // console.log("created after", created);

    const newDate = new Date(created);
    console.log("newDate", newDate);

    storeRevenue[i].createAt = newDate;

    await storeRevenue[i].save();
  }
};

const trainModelPredictRevenue = asyncHandler(async (req, res) => {
  const currentMonth = moment();
  const storeId = req.params.storeId;

  // Ngày đầu tháng hiện tại
  const fromDate = currentMonth
    .clone()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY/MM/DD");

  // Ngày cuối tháng hiện tại
  const toDate = currentMonth.endOf("month").format("YYYY/MM/DD");

  const dataFromDB = await statisticService.getRevenueDayInRange(
    storeId,
    fromDate,
    toDate
  );

  // await updateCreatedAt(storeId);

  const trainModelData = await new Promise((resolve, reject) => {
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
      if (code !== 0) {
        console.error(`Python exited with code ${code} for store ${storeId}`);
        return reject(new Error(`Python exited with code ${code}`));
      }

      if (error && error.toLowerCase().includes("traceback")) {
        console.error(`Python error for store ${storeId}:`, error);
        return reject(new Error(`Python error: ${error}`));
      }

      try {
        console.log("Python output:", result);
        const parsed = JSON.parse(result);
        resolve(parsed); // <-- chỉ lấy mảng weights
      } catch (err) {
        reject(new Error(`Parse error: ${err.message}`));
      }
    });

    pyProcess.stdin.write(JSON.stringify(dataFromDB));
    pyProcess.stdin.end();
  });

  const weights = trainModelData.trainModelData.weights;
  const std = trainModelData.trainModelData.scaler.std;
  const mean = trainModelData.trainModelData.scaler.mean;
  const lastDate = trainModelData.trainModelData.last_date;

  const predictValue = await WeightForRevenuePredict.findOneAndUpdate(
    { storeId },
    { weights, std, mean, lastDate },
    { upsert: true, new: true }
  );

  res.json({
    message: `Model trained and saved for store ${storeId}`,
    predictValue,
  });
});

const predictRevenue = asyncHandler(async (req, res) => {
  const storeId = req.params.storeId;
  // // Lấy tháng hiện tại + 1
  // const nextMonth = moment().add(1, "month");

  // // Lấy số ngày trong tháng đó
  // const daysInMonth = nextMonth.daysInMonth();

  // // Lấy số tháng (1-12)
  // const monthNumber = nextMonth.month() + 1; // vì moment().month() trả về 0-11

  // // Tạo dữ liệu futureData
  // const futureData = Array.from({ length: daysInMonth }, (_, i) => ({
  //   day: i + 1,
  //   month: monthNumber,
  // }));

  // console.log("futureData", futureData);

  const predictValue = await WeightForRevenuePredict.findOne({ storeId });

  if (!predictValue) {
    console.warn(`No weights found for store ${storeId}`);
  }

  const today = new Date();
  const start_date = new Date(today);
  start_date.setDate(today.getDate() + 1);

  const input_data = {
    weights: predictValue.weights,
    std: predictValue.std,
    mean: predictValue.mean,
    start_date: predictValue.lastDate,
    num_days: 7,
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
        const parsed = JSON.parse(result);

        const predictedRevenues = parsed.dates.map((dateStr, i) => {
          const date = moment(dateStr); // Dùng moment để xử lý ngày
          return {
            day: date.date().toString(), // lấy ngày trong tháng
            month: (date.month() + 1).toString(), // tháng 0-based nên +1
            predicted_revenue: parsed.predictions[i],
          };
        });

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

  // console.log("Prediction result:", prediction);

  res.json({
    message: `Prediction completed for store ${storeId}`,
    prediction,
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
