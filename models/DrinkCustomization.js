const mongoose = require("mongoose");

const DOCUMENT_NAME = "DrinkCustomization";
const COLLECTION_NAME = "DrinkCustomizations";

const DrinkCustomizationSchema = new mongoose.Schema(
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
    unit: {
      type: String,
      required: [true, "Please provide unit"],
    },
    option: [{ value: String }],
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

module.exports = mongoose.model(DOCUMENT_NAME, DrinkCustomizationSchema);

/**
 * Query pattern
 *
 *
 */

/**
 * Nước có size S, M, L
 * Size M cộng thêm: 50ml
 * Size L cộng thêm: 100ml
 * Lượng đá có 20%, 50%, 70%, 100%
 * Lượng đường có 0%, 20%, 50%, 70%, 100%
 *
 * unit có 2 dạng là ml và %
 */
