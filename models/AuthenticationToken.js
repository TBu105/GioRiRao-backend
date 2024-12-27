const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "AuthenticationToken";
const COLLECTION_NAME = "AuthenticationTokens";

// Create the Role schema
const AuthenticationTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    // mark the token as revoked
    isRevoke: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: COLLECTION_NAME, // Specify the collection name
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
module.exports = mongoose.model(DOCUMENT_NAME, AuthenticationTokenSchema);

/**
 * Login:
1. User provides credentials
2. Server validates credentials
3. Generate access & refresh tokens
4. Store refresh token in database
5. Return both tokens to client

API Requests:
1. Client includes access token in header
2. Server validates token
3. If valid, process request
4. If expired, use refresh token to get new pair

Token Refresh:
1. Client sends refresh token
2. Server validates token
3. Old refresh token is revoked
4. New access & refresh tokens generated
5. New refresh token stored in database
 */
