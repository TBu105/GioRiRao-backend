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

const updateTopping = async (query, data) => {
  const updatedTopping = await Topping.findOneAndUpdate(query, data, {
    new: true,
  });

  return updatedTopping;
};

const getAllToppings = async () => {
  const toppings = await Topping.find({});

  return toppings;
};

module.exports = {
  findTopping,
  createTopping,
  updateTopping,
  getAllToppings,
};
