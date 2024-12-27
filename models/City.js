const mongoose = require("mongoose");

const DOCUMENT_NAME = "City";
const COLLECTION_NAME = "Cities";

const CitySchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    name: {
      type: String,
      required: [true, "Please provide city name"],
      unique: [true, "This city name already exist "],
    },
    totalAreas: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model(DOCUMENT_NAME, CitySchema);


