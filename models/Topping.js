const mongoose = require("mongoose");

const DOCUMENT_NAME = "Topping";
const COLLECTION_NAME = "Toppings";

const ToppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide topping name"],
      unique: [true, "This topping name already exist "], // Make sure name of the topping is not duplicate
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide topping price"],
      min: 0,
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide topping image"],
    },
    // indication of whether data has been deleted or not
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Indexes for performance

module.exports = mongoose.model(DOCUMENT_NAME, ToppingSchema);

/**
 * Query pattern
 *
 *
 */

/**
 * Sử dụng định dạng webp cho ảnh
 */
