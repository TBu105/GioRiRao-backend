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

module.exports = {
  createOrder,
};
