const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const orderService = require("../services/order.service");

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = await orderService.createOrder(req.body);

  return res.status(HttpStatusCodes.CREATED.code).json({
    message: "Create order successfully",
    newOrder,
  });
});

const updateOrderStatusToComplete = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatusToComplete(req.params.id);

  return res.status(HttpStatusCodes.OK.code).json({
    message: "Update order status to COMPLETED successfully",
    order,
  });
});

const getPendingOrdersByStoreandDate = asyncHandler(async (req, res) => {
  const order = await orderService.getPendingOrdersByStoreandDate(req.params.storeId);

  return res.status(HttpStatusCodes.OK.code).json({
    message: "Get all pending orders successfully",
    order,
  });
});

const getOrderDetail = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderDetail(req.params.id);

  return res.status(HttpStatusCodes.OK.code).json({
    message: "Get order detail successfully",
    order,
  });
});

module.exports = {
  createOrder,
  updateOrderStatusToComplete,
  getPendingOrdersByStoreandDate,
  getOrderDetail
};
