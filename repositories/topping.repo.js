const Topping = require("../models/Topping");

const createTopping = async (data) => {
  const newTopping = new Topping(data);
  return await newTopping.save();
};

const findTopping = async (data) => {
  let query = {
    ...data,
    deleted: false,
  };

  const topping = await Topping.findOne(query);

  return topping;
};

const updateTopping = async (id, data) => {
  console.log("data update", data);
  return await Topping.findOneAndUpdate({ _id: id }, data, { new: true });
};

const getAllToppings = async () => {
  const toppings = await Topping.find({ deleted: false });

  return toppings;
};

module.exports = {
  findTopping,
  createTopping,
  updateTopping,
  getAllToppings,
};
