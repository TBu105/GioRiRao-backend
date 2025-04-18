const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const orderService = require("../services/order.service");

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = await orderService.createOrder(req.body);
  console.log("newOrder", newOrder);
  return res.status(HttpStatusCodes.CREATED.code).json({
    message: "Create order successfully",
    newOrder,
  });
});
const getOrderByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const order = await orderService.getOrderByCode(code);

  return res.status(200).json({
    message: "Get order successfully",
    order,
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
  const order = await orderService.getPendingOrdersByStoreandDate(
    req.params.storeId
  );

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
  getOrderByCode,
  createOrder,
  updateOrderStatusToComplete,
  getPendingOrdersByStoreandDate,
  getOrderDetail,
};
