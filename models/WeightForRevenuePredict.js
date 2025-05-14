const mongoose = require("mongoose");

const DOCUMENT_NAME = "WeightForRevenuePredict";
const COLLECTION_NAME = "WeightForRevenuePredicts";

const WeightForRevenuePredictSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    weights: {
      type: Array,
      required: true,
    },
    std: {
      type: Array,
      required: true,
    },
    mean: {
      type: Array,
      required: true,
    },
    lastDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, WeightForRevenuePredictSchema);
