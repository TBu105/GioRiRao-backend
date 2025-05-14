const express = require("express");
const aiController = require("../controllers/ai.controller");
const validate = require("../middlewares/validation.middleware");

const router = express.Router();
router.post("/train/:storeId", aiController.trainModelPredictRevenue);
router.post("/predict/:storeId", aiController.predictRevenue);
router.get("/month/:storeId", aiController.getPredictedRevenue);

module.exports = router;
