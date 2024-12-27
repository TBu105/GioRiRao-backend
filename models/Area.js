const mongoose = require("mongoose");

const DOCUMENT_NAME = "Area";
const COLLECTION_NAME = "Areas";

const AreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide area name"],
      unique: [true, "This area name already exist"],
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    totalStores: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model(DOCUMENT_NAME, AreaSchema);

/**
 * Dữ liệu mẫu:
 * {
 *   name: 'District 1',
 *   cityId: sampleCity._id,
 *   managerId: sampleManager._id,
 *   totalStores: 30,
 *   deleted: false
 * }
 */