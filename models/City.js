const mongoose = require("mongoose");

const DOCUMENT_NAME = "City";
const COLLECTION_NAME = "Cities";

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide city name"],
      unique: [true, "This city name already exist "],
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

/** Dữ liệu mẫu cho thành phố
 * [
      {
        name: 'Ho Chi Minh City',
        totalAreas: 50,
        totalStores: 200,
        delete: false,
      },
      {
        name: 'Hanoi',
        totalAreas: 40,
        totalStores: 150,
        delete: false,
      },
    ]
 */
