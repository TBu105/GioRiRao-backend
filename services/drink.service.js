const drinkRepo = require("../repositories/drink.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createDrink = async (drinkData) => {
    const existingDrink = await drinkRepo.findDrinkByName(drinkData.name);
    if (existingDrink) {
        throw new BadRequest("Drink with this name already exists.");
    }
    const newDrink = await drinkRepo.createDrink(drinkData);
    setTimeout(async () => {
        newDrink.flags.isNew = false;
        await newDrink.save();
    }, 7 * 24 * 60 * 60 * 1000); // 1 tuần
    return newDrink;
}
const updateDrink = async (id, updateData) => {
    if (updateData.hasOwnProperty("deleted")) {
        throw new BadRequest("The 'deleted' field cannot be updated directly.");
    }
    const updatedDrink = await drinkRepo.updateDrinkById(id, updateData);
    if (!updatedDrink) {
        throw new NotFound("Drink not found.");
    }
    return updatedDrink;
}
const getAllDrinks = async () => {
    return await drinkRepo.findAllDrinks();
}
const getDrinkById = async (id) => {
    const drink = await drinkRepo.findDrinkById(id);
    if (!drink) {
        throw new NotFound("Drink not found.");
    }
    return drink;
}
const deleteDrink = async (id) => {
    const deletedDrink = await drinkRepo.deleteDrinkById(id);
    if (!deletedDrink) {
        throw new NotFound("Drink not found.");
    }
    return deletedDrink;
};
const getIngredientsRecipe = async (id) => {
    const drink = await drinkRepo.getIngredientsRecipe(id);
    if (!drink) {
        throw new NotFound("Drink not found.");
    }
    return drink;
}
const getDrinkByName = async (name) => {
    const drink = await drinkRepo.findDrinkByName(name);
    if (!drink) {
        throw new NotFound("Drink not found.");
    }
    return drink;
}
module.exports = { updateDrink, createDrink, getAllDrinks, getDrinkById, deleteDrink, getIngredientsRecipe, getDrinkByName };