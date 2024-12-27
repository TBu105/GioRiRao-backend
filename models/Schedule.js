const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "Schedule";
const COLLECTION_NAME = "Schedules";

// Create the Role schema
const ScheduleSchema = new mongoose.Schema(
  {
    shift: {
      type: String,
      enum: ["1", "2", "3", "4"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    maximumStaff: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: COLLECTION_NAME, // Specify the collection name
  }
);

/**
 * Query pattern
 *
 */

// Index for query faster

// Export the Country model
module.exports = mongoose.model(DOCUMENT_NAME, ScheduleSchema);

/**
 *
 */
