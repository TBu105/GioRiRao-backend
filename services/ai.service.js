const { BadRequest, NotFound } = require("../config/error.response.config");
const { exec } = require("child_process");
const pythonPath = "venv\\Scripts\\python.exe";

const trainModelPredictRevenue = async () => {
  exec(`${pythonPath} train_model.py`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${stderr}`);
    } else {
      res.send(stdout);
    }
  });

  return "Train model successfully";
};

const predictRevenue = async () => {
  exec(`${pythonPath} predict.py`, (error, stdout, stderr) => {
    if (error) {
      console.error("Python error:", stderr);
      return res
        .status(500)
        .json({ error: "Prediction failed", detail: stderr });
    }

    try {
      const prediction = JSON.parse(stdout);
      res.json(prediction);
    } catch (e) {
      console.error("JSON parse error:", e);
      res.status(500).json({ error: "Invalid response from Python" });
    }
  });

  return "Predict revenue successfully";
};

module.exports = { trainModelPredictRevenue, predictRevenue };
