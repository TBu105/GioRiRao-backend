const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "StoreRevenue";
const COLLECTION_NAME = "StoreRevenues";

// Create the Headquarter schema
const StoreRevenueSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    day: {
      type: Number
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: COLLECTION_NAME, // Specify the collection name
  }
);

/**
 * Query pattern riêng
 *
 * Hiển thị doanh thu cửa hàng
 */

/**
 * Query pattern chung
 *
 * Sau 4 tiếng
 */

// Index for query faster
StoreRevenueSchema.index({ storeId: 1, date: 1 });

// Export the Country model
module.exports = mongoose.model(DOCUMENT_NAME, StoreRevenueSchema);
