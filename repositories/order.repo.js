const { NotFound } = require("../config/error.response.config");
const Order = require("../models/Order");
const mongoose = require("mongoose");

const createOrder = async (data, session) => {
  const order = new Order({
    ...data,
    storeId: new mongoose.Types.ObjectId(data.storeId),
    createdBy: new mongoose.Types.ObjectId(data.createdBy),
    items: data.items.map((item) => ({
      ...item,
      drinkId: new mongoose.Types.ObjectId(item.drinkId),
      toppings: item.toppings.map((topping) => ({
        ...topping,
        toppingId: new mongoose.Types.ObjectId(topping.toppingId),
      })),
    })),
  });
  await order.save({ session });
};

const updateOrderStatusToComplete = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new NotFound("Order not found");
  }

  return order;
};

const getPendingOrdersByStoreandDate = async (storeId) => {
  // Get start and end of today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const pendingOrders = await Order.find({
    storeId,
    status: "PENDING",
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ createdAt: 1 });

  return pendingOrders;
};

const getOrderDetail = async (orderId) => {
  const orderDetail = await Order.findById({ _id: orderId, status: "PENDING" });

  if (!orderDetail) {
    throw new NotFound("Order not found");
  }

  return orderDetail;
};

const calculateRevenueByShift = async (storeId, date, timeFrame) => {
  // 1. Xác định khoảng thời gian bắt đầu và kết thúc của ngày
  const start = new Date(date);
  start.setHours(
    0,
    start.getMinutes(),
    start.getSeconds(),
    start.getMilliseconds()
  );
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const orders = await Order.find({
    storeId,
    status: "COMPLETED",
    timeFrame,
    createdAt: { $gte: start, $lte: end },
  });

  if (!orders) {
    throw new NotFound("Order not found");
  }

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return totalRevenue;
};

module.exports = {
  createOrder,
  updateOrderStatusToComplete,
  getPendingOrdersByStoreandDate,
  getOrderDetail,
  calculateRevenueByShift,
};
