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
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  }
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
  }
);

const OrderSchema = new mongoose.Schema(
  {
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
    onlineStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "DELIVERED",
        "CANCELLED",
      ],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["CASH", "CARD", "MOBILE_PAYMENT"],
      default: "CASH",
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
