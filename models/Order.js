const mongoose = require("mongoose");

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

const ToppingOrderDetailSchema = new mongoose.Schema(
  {
    toppingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topping",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const OrderDetailSchema = new mongoose.Schema(
  {
    drinkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drink",
      required: true,
    },
    drinkName: {
      type: String,
      required: true,
    },
    drinkPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: String,
      required: true,
      enum: ["S", "M", "L"], // You can customize this
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    note: {
      type: String,
      trim: true,
    },
    toppings: [ToppingOrderDetailSchema],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    // Mã hóa đơn
    code: {
      type: String,
      required: true,
    },
    // Người tạo hóa đơn
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    // Hóa đơn thuộc về cửa hàng
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Please provide store id"],
    },
    items: [OrderDetailSchema],
    // Trạng thái hóa đơn
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "MOBILE_PAYMENT"],
      default: "Cash",
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Indexes for performance

module.exports = mongoose.model(DOCUMENT_NAME, OrderSchema);

/**
 * Sử dụng định dạng webp cho ảnh
 */
