const mongoose = require("mongoose");

const DOCUMENT_NAME = "Headquarter";
const COLLECTION_NAME = "Headquarters";

const HeadquarterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide headquarter name"],
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
    },
    totalCities: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAreas: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalStores: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Export the Country model
module.exports = mongoose.model(DOCUMENT_NAME, HeadquarterSchema);
