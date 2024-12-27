const mongoose = require("mongoose");

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
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique,
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
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    customPermissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
    }],
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Number,
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
