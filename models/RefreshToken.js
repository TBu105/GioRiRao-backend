const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "RefreshToken";
const COLLECTION_NAME = "RefreshTokens";

// Create the RefreshToken schema
const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "userType", // This will reference either 'User' or 'Staff'
    },
    userType: {
      type: String,
      required: true,
      enum: ["User", "Staff"], // This ensures the userType is either 'User' or 'Staff'
    },
    refreshToken: {
      type: String,
      required: true,
    },
    revoked: {
      type: Boolean,
      default: false, // Initially, the token is not revoked
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
// Add a compound index for userId and revoked
RefreshTokenSchema.index({ userId: 1, revoked: 1 });

// Export the RefreshToken model
module.exports = mongoose.model(DOCUMENT_NAME, RefreshTokenSchema);
