const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "StoreTopDrink";
const COLLECTION_NAME = "StoreTopDrinks";

// Create the Headquarter schema
const StoreTopDrinkSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    topDrinks: {
      type: [
        {
          _id: false,
          drinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drink",
            required: true,
          },
          drinkName: {
            type: String,
            required: true,
          },
          totalQuantity: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, StoreTopDrinkSchema);
