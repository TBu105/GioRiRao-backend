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

module.exports = {
  createOrder,
};
