const Drink = require("../models/Drink");

const createDrink = async (drinkData) => {
  const drink = new Drink(drinkData);
  return await drink.save();
};
const findDrinkByNameFullTextSearch = async (name) => {
  const drinks = await Drink.find({
    $text: { $search: name },
  }).lean();
  return drinks;
};
const findDrinkByNameRegex = async (regexPattern) => {
  const drinks = await Drink.find({ name: { $regex: regexPattern } });
  return drinks;
};
const findDrinkByCategory = async (category, { skip, limit, sort }) => {
  return await Drink.find({ category, deleted: false })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};
const findDrinkById = async (id) => {
  return await Drink.findById(id, { deleted: false }).lean();
};
const getCategories = async () => {
  return await Drink.distinct("category").lean();
};
const findAllDrinks = async ({ skip, limit, sort }) => {
  return await Drink.find({ deleted: false })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};
const countAllDrinks = async () => {
  return await Drink.countDocuments({ deleted: false });
};
const updateDrinkById = async (id, updateData) => {
  return await Drink.findByIdAndUpdate(id, updateData, {
    new: true,
    deleted: false,
  });
};
const deleteDrinkById = async (id) => {
  return await Drink.findByIdAndUpdate(id, { deleted: true }, { new: true });
};
const getIngredientsRecipe = async (id) => {
  return await Drink.findById(id, { ingredients: 1, recipe: 1 }).lean();
};
module.exports = {
  createDrink,
  findDrinkByNameFullTextSearch,
  findDrinkByNameRegex,
  findDrinkById,
  findAllDrinks,
  updateDrinkById,
  deleteDrinkById,
  getIngredientsRecipe,
  countAllDrinks,
  findDrinkByCategory,
  getCategories,
};
