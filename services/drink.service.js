const drinkRepo = require("../repositories/drink.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");
const uploadService = require("./upload.service");

const createDrink = async (drinkData, thumbnailFile, imageFiles) => {
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
    const updatedDrink = await drinkRepo.updateDrinkById(id, updateData);
    return updatedDrink;
}
const getAllDrinks = async ({ page, limit, sort }) => {

    const skip = (page - 1) * limit;
    const [docs, totalDocs] = await Promise.all([
        drinkRepo.findAllDrinks({ skip, limit, sort }),
        drinkRepo.countAllDrinks()
    ]);
    return {
        docs,
        totalDocs,
        limit,
        totalPages: Math.ceil(totalDocs / limit),
        page,
        hasPrevPage: page > 1,
        hasNextPage: page * limit < totalDocs,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page * limit < totalDocs ? page + 1 : null,
    };
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