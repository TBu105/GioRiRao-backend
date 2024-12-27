const mongoose = require("mongoose");

const DOCUMENT_NAME = "Area";
const COLLECTION_NAME = "Areas";

const AreaSchema = new mongoose.Schema(
  {
    // Name of the area, for example: Phường 5, Quận 8, ...
    name: {
      type: String,
      required: [true, "Please provide city name"],
      unique: [true, "This area name already exist "], // Make sure name of the area is not duplicate
    },
    // City's information that area belong to
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", // Reference to the City model
    },
    // Reference to the manager user (if applicable)
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
    },
    totalStores: {
      type: Number,
      default: 0,
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

/**
 * Query pattern
 */

// Create index to speed up query

module.exports = mongoose.model(DOCUMENT_NAME, AreaSchema);
