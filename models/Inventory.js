const mongoose = require("mongoose");

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const InventorySchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    ingredients: [
      {
        _id: false,
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, InventorySchema);
