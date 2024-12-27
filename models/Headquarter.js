const mongoose = require("mongoose");

const DOCUMENT_NAME = "Headquarter";
const COLLECTION_NAME = "Headquarters";

const HeadquarterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide headquarter name"],
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
    },
    totalCities: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAreas: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalStores: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Export the  model
module.exports = mongoose.model(DOCUMENT_NAME, HeadquarterSchema);

/**Dữ liệu mẫu cho collection "headquarters" 
 *     {
        name: 'Gio Ri Rao',
        managerId: sampleManager._id,
        totalCities: 10,
        totalAreas: 20,
        totalStores: 100,
      },
 */
