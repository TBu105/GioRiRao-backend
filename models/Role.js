const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "Role";
const COLLECTION_NAME = "Roles";

// Create the Role schema
const RoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: [
        "admin",
        "managerStore",
        "managerArea",
        "managerCity",
        "managerCity",
        "managerHeadQuarter",
        "staffShipper",
        "staffCashier",
        "staffBarista",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
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
module.exports = mongoose.model(DOCUMENT_NAME, RoleSchema);

/**
 * Thông tin cá nhân của nhân viên: tên, email, số điện thoại, địa chỉ
 * Họ đăng nhập sử dụng email và mật khẩu
 *
 * Họ có liên quan tới đăng nhập, đăng ký
 * Họ có liên quan tới lịch làm việc của cửa hàng
 * Họ có liên quan tới phân quyền
 */
