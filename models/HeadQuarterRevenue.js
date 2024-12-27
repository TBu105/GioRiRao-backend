const mongoose = require("mongoose");

// Define constants for the model and collection names
const DOCUMENT_NAME = "HeadquarterRevenue";
const COLLECTION_NAME = "HeadquarterRevenues";

// Create the Headquarter schema
const HeadquarterRevenueSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    week: {
      type: Number,
      required: true,
      index: true,
    },
    month: {
      type: Number,
      required: true,
      index: true,
    },
    quarter: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
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
module.exports = mongoose.model(DOCUMENT_NAME, HeadquarterRevenueSchema);

/**
 * Sau 4 tiếng cập nhật dữ liệu doanh thu 1 lần
 * Cụ thể là các giờ vào cuối ca 11 giờ, 3 giờ, 7 giờ, 11 giờ tối
 *
 * Dữ liệu hiển thị
 * Theo ngày -> theo ca
 * Theo tuần
 * Theo tháng
 * Theo quý
 * Theo năm
 *
 * Lưu trữ dữ liệu 5 năm
 *
 * Luồng thống kê đi từ ca đến tổng hệ thống
 * Vào lúc ca làm việc kết thúc
 * Doanh thu cửa hàng mới = Doanh thu cửa hàng cũ + Doanh thu ca
 * Doanh thu khu vực mới = Doanh thu khu vực cũ + Doanh thu các cửa hàng thuộc khu vực
 * Doanh thu thành phố mới = Doanh thu thành phố cũ + Doanh thu các khu vực thuộc thành phố
 * Doanh thu tổng mới = Doanh thu tổng cũ + Doanh thu các thành phố thuộc tổng
 * Tiến hành lưu trữ dữ liệu
 *
 * Gom nhóm dữ liệu ca lại thành 1 ngày
 * 1 ngày có 4 ca
 *
 */
