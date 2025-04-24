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
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, WeightForRevenuePredictSchema);
