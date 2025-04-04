const orderRepository = require("../repositories/order.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");
const mongoose = require("mongoose");
const {
  default: generateOrderCode,
} = require("../utils/generate.order.code.util");

const createOrder = async (orderData) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // body
    if (!orderData.items) {
      throw new BadRequest("Order must have at least one drink");
    }

    orderData.code = generateOrderCode();
    orderData.status = "PENDING";

    const newOrder = await orderRepository.createOrder(orderData, session);

    await session.commitTransaction();

    return newOrder;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateOrderStatusToComplete = async (orderId) => {
  const status = "COMPLETED";
  const order = await orderRepository.updateOrderStatusToComplete(orderId, status);

  return order;
};

const getPendingOrdersByStoreandDate = async (orderId) => {
  // Get peding order by storeId, and by now
  const pendingOrder = await orderRepository.getPendingOrdersByStoreandDate(orderId);

  return pendingOrder;
};

module.exports = {
  createOrder,
  updateOrderStatusToComplete,
  getPendingOrdersByStoreandDate
};
