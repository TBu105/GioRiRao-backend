const mongoose = require("mongoose");
const validator = require("validator");

// Define constants for the model and collection names
const DOCUMENT_NAME = "Staff";
const COLLECTION_NAME = "Staffs";

// Create the Staff schema
const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Use validator's isEmail method to check if the email is valid
          return validator.isEmail(v);
        },
        message: "Please enter a valid email address", // Custom error message
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: [
        "admin",
        "storeManager",
        "staffCashier",
        "staffBarista",
        "staffWaiter",
      ],
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
module.exports = mongoose.model(DOCUMENT_NAME, StaffSchema);

/**
 * Thông tin cá nhân của nhân viên: tên, email, số điện thoại, địa chỉ
 * Họ đăng nhập sử dụng email và mật khẩu
 *
 * Họ có liên quan tới đăng nhập, đăng ký
 * Họ có liên quan tới lịch làm việc của cửa hàng
 * Họ có liên quan tới phân quyền
 */
