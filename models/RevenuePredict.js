const mongoose = require("mongoose");

const DOCUMENT_NAME = "RevenuePredict";
const COLLECTION_NAME = "RevenuePredicts";

const RevenuePredictSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    predictedRevenues: [
      {
        _id: false,
        day: String,
        month: String,
        predicted_revenue: Number,
      },
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, RevenuePredictSchema);
