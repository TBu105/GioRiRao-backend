const orderRepository = require("../repositories/order.repo");
const drinkRepository = require("../repositories/drink.repo");
const toppingRepository = require("../repositories/topping.repo");
const inventoryRepository = require("../repositories/inventory.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");
const mongoose = require("mongoose");
const checkOrderTimeFrame = require("../utils/check.order.time.frame.util");
const generateOrderCode = require("../utils/generate.order.code.util");

const createOrder = async (orderData) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (!orderData.items || orderData.items.length === 0) {
      throw new BadRequest("Order must have at least one drink");
    }

    const timeFrame = checkOrderTimeFrame("order");
    if (!timeFrame) {
      throw new BadRequest(
        "Can not create order due to time frame is not valid"
      );
    }

    orderData.timeFrame = timeFrame;
    orderData.code = generateOrderCode();
    orderData.status = "PENDING";

    // Step 1: Tổng hợp nguyên liệu cần dùng
    const totalIngredients = {};

    for (const item of orderData.items) {
      const drink = await drinkRepository.findDrinkById(item.drinkId);
      if (!drink) throw new BadRequest("Drink not found");

      drink.ingredients.forEach((ing) => {
        const key = ing.name;
        const amount = parseFloat(ing.quantity) * item.quantity;
        totalIngredients[key] = (totalIngredients[key] || 0) + amount;
      });

      for (const topping of item.toppings) {
        const toppingDoc = await toppingRepository.findTopping(
          topping.toppingId
        );
        if (!toppingDoc) throw new BadRequest("Topping not found");

        toppingDoc.ingredients.forEach((ing) => {
          const key = ing.name;
          const amount = parseFloat(ing.quantity) * item.quantity;
          totalIngredients[key] = (totalIngredients[key] || 0) + amount;
        });
      }
    }

    // Step 2: Truy vấn tồn kho
    const storeInventory = await inventoryRepository.getInventoryByStore(
      orderData.storeId,
      session
    );
    if (!storeInventory) throw new BadRequest("Inventory not found for store");

    // // Step 3: Kiểm tra tồn kho có đủ không
    // for (const [name, requiredQty] of Object.entries(totalIngredients)) {
    //   const invItem = storeInventory.ingredients.find((ing) => ing.name === name);
    //   if (!invItem || invItem.quantity < requiredQty) {
    //     throw new BadRequest(`Not enough ingredient: ${name}`);
    //   }
    // }


    // Step 4: Trừ kho
    for (const [name, usedQty] of Object.entries(totalIngredients)) {
      const invItem = storeInventory.ingredients.find(
        (ing) => ing.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (invItem) {
        invItem.quantity -= usedQty;
      } else {
        console.warn(`Không tìm thấy nguyên liệu: ${name}`);
      }
    }

    await storeInventory.save({ session });

    // Step 5: Tạo đơn hàng
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
const getOrderByCode = async (code) => {
  const order = await orderRepository.getOrderByCode(code);
  if (!order) {
    throw new NotFound("Order not found");
  }
  return order;
};

const updateOrderStatusToComplete = async (orderId) => {
  const status = "COMPLETED";
  const order = await orderRepository.updateOrderStatusToComplete(
    orderId,
    status
  );

  return order;
};

const getPendingOrdersByStoreandDate = async (storeId) => {
  // Get peding order by storeId, and by now
  const pendingOrder = await orderRepository.getPendingOrdersByStoreandDate(
    storeId
  );

  return pendingOrder;
};

const getOrderDetail = async (orderId) => {
  const orderDetail = await orderRepository.getOrderDetail(orderId);

  return orderDetail;
};

module.exports = {
  getOrderByCode,
  createOrder,
  updateOrderStatusToComplete,
  getPendingOrdersByStoreandDate,
  getOrderDetail,
};
