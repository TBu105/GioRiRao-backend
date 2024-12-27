const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "RolePermission";
const COLLECTION_NAME = "RolePermissions";

// Create the RolePermission schema
const RolePermissionSchema = new mongoose.Schema(
  {
    // permissions name example: Create User, Update User, Delete User
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // code example : CREATE_USER, UPDATE_USER, DELETE_USER
    code: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    // example: User, Product, Order
    category: {
      type: String,
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
module.exports = mongoose.model(DOCUMENT_NAME, RolePermissionSchema);

