const mongoose = require("mongoose");

const DOCUMENT_NAME = "Store";
const COLLECTION_NAME = "Stores";

const StoreSchema = new mongoose.Schema(
  {
    // Store name (e.g., "Downtown Cafe")
    name: {
      type: String,
      required: [true, "Please provide store name"],
      unique: [true, "This store name already exist "], // Make sure name of the store is not duplicate
    },
    address: {
      type: String,
      required: [true, "Please provide store address"],
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to the Staff model
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please provide a valid email"],
    },
    // Area's information that the store belongs to (e.g., ObjectId of a specific area)
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area", // Reference to the Area model
      required: [true, "Please provide area ID"],
    },
    // City ID: Reference to the city where the store is located (e.g., ObjectId of a city)
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", // Reference to the City model
      required: [true, "Please provide city ID"],
    },
    // Staffs associated with the store (e.g., list of ObjectIds of staff members)
    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff", // Reference to the Staff model
      },
    ],
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

/**
 * Query pattern
 */

// Indexes for performance

module.exports = mongoose.model(DOCUMENT_NAME, StoreSchema);

/**Dữ liệu mẫu
 * const storesData = [
  {
    name: 'Store 1, Phường 1, Quận 1',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    managerId: '60f72b2f9d1b8c001f4b89fb', // ID của nhân viên quản lý (Staff)
    phone: '0901234567',
    email: 'store1@example.com',
    areaId: '60f72b2f9d1b8c001f4b89fa', // ID của khu vực (Area)
    cityId: '60f72b2f9d1b8c001f4b89f9', // ID của thành phố (City)
    staffs: ['60f72b2f9d1b8c001f4b89fc', '60f72b2f9d1b8c001f4b89fd'], // Mảng ID nhân viên (Staff)
    isActive: true,
    deleted: false,
  },
  {
    name: 'Store 2, Phường 2, Quận 1',
    address: '456 Đường XYZ, Quận 1, TP.HCM',
    managerId: '60f72b2f9d1b8c001f4b89fb', // ID của nhân viên quản lý (Staff)
    phone: '0907654321',
    email: 'store2@example.com',
    areaId: '60f72b2f9d1b8c001f4b89fa', // ID của khu vực (Area)
    cityId: '60f72b2f9d1b8c001f4b89f9', // ID của thành phố (City)
    staffs: ['60f72b2f9d1b8c001f4b89fc'], // Mảng ID nhân viên (Staff)
    isActive: true,
    deleted: false,
  },
  {
    name: 'Store 3, Phường 5, Quận 8',
    address: '789 Đường 123, Quận 8, TP.HCM',
    managerId: '60f72b2f9d1b8c001f4b89fa', // ID của nhân viên quản lý (Staff)
    phone: '0912345678',
    email: 'store3@example.com',
    areaId: '60f72b2f9d1b8c001f4b89fb', // ID của khu vực (Area)
    cityId: '60f72b2f9d1b8c001f4b89f9', // ID của thành phố (City)
    staffs: ['60f72b2f9d1b8c001f4b89fe'], // Mảng ID nhân viên (Staff)
    isActive: false,
    deleted: false,
  }
];

 */
