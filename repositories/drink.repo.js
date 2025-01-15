const Drink = require("../models/Drink");

const createDrink = async (drinkData) => {
    const drink = new Drink(drinkData);
    return await drink.save();
};
const findDrinkByName = async (name) => {
    return await Drink.findOne({ name, deleted: false }).lean();
};
const findDrinkById = async (id) => {
    return await Drink.findById(id, { deleted: false }).lean();
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
    return await Drink.findByIdAndUpdate(id, updateData, { new: true, deleted: false });
};
const deleteDrinkById = async (id) => {
    return await Drink.findByIdAndUpdate(id, { deleted: true }, { new: true });
};
const getIngredientsRecipe = async (id) => {
    return await Drink.findById(id, { ingredients: 1, recipe: 1 }).lean();
};
module.exports = {
    createDrink,
    findDrinkByName,
    findDrinkById,
    findAllDrinks,
    updateDrinkById,
    deleteDrinkById,
    getIngredientsRecipe,
    countAllDrinks,
};