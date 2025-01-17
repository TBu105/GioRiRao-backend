const orderRepository = require("../repositories/order.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");
const mongoose = require("mongoose");

const createOrder = async (orderData) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // body
    if (!orderData.items) {
      throw new BadRequest("Order must have at least one drink");
    }

    const newOrder = await orderRepository.createOrder(orderData, session)

    await session.commitTransaction();

    return newOrder
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

module.exports = {
  createOrder,
};
