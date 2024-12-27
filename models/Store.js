const mongoose = require("mongoose");

const DOCUMENT_NAME = "Store";
const COLLECTION_NAME = "Stores";

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide store name"],
      unique: [true, "This store name already exist "], // Make sure name of the store is not duplicate
    },
    address: {
      type: String,
      required: [true, "Please provide store address"],
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please provide a valid email"],
    },
    // Area's information that store belong to
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area", // Reference to the Area model
      required: [true, "Please provide area ID"],
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", // Reference to the City model
      required: [true, "Please provide city ID"],
    },
    staffs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
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

// Indexes for performance

module.exports = mongoose.model(DOCUMENT_NAME, StoreSchema);
