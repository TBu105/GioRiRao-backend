const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const DOCUMENT_NAME = "Drink";
const COLLECTION_NAME = "Drinks";

const DrinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide drink name"],
      unique: [true, "This drink name already exist "], // Make sure name of the drink is not duplicate
      trim: true,
      index: true,
    },
    customization: [
      {
        size: {
          type: String,
          required: [true, "Please provide drink size"],
          enum: ["S", "M", "L"],
        },
        price: {
          type: Number,
          required: [true, "Please provide drink customization"],
          min: 0,
        },
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      max: 100,
      trim: true,
    },
    slug: {
      type: String,
      // required: [true, "Please provide drink slug"],
      unique: [true, "This drink slug already exist "], // Make sure slug of the drink is not duplicate
      index: true,
    },
    thumbnail: {
      type: String,
    },
    images: [
      {
        url: String,
        alt: String,
        order: Number,
      },
    ],
    ingredients: [
      {
        name: String,
        quantity: String,
        unit: String,
      },
    ],
    recipe: {
      type: String,
      trim: true,
    },
    flags: {
      isBestSeller: { type: Boolean, default: false },
      isNew: { type: Boolean, default: true },
      isSeasonSpecial: { type: Boolean, default: false },
    },
    category: {
      type: String,
      required: [true, "Please provide drink category"],
      enum: ["coffee", "tea", "smoothie", "juice", "others"],
    },
    tags: [{ type: String, index: true }],
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

module.exports = mongoose.model(DOCUMENT_NAME, DrinkSchema);
