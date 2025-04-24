const drinkRepo = require("../repositories/drink.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");
const uploadService = require("./upload.service");
const agenda = require("../config/agenda.config");

const createDrink = async (drinkData, thumbnailFile, imageFiles) => {
  const newDrink = await drinkRepo.createDrink(drinkData);
  await agenda.schedule("in 1 second", "set isNew to false", {
    id: newDrink._id,
  });
  return newDrink;
};
const updateDrink = async (id, updateData) => {
  const updatedDrink = await drinkRepo.updateDrinkById(id, updateData);
  return updatedDrink;
};
const getAllDrinks = async ({ page, limit, sort }) => {
  const skip = (page - 1) * limit;
  const [docs, totalDocs] = await Promise.all([
    drinkRepo.findAllDrinks({ skip, limit, sort }),
    drinkRepo.countAllDrinks(),
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
};
const getDrinkByCategory = async (category, { page, limit, sort }) => {
  const skip = (page - 1) * limit;
  const [docs, totalDocs] = await Promise.all([
    drinkRepo.findDrinkByCategory(category, { skip, limit, sort }),
    drinkRepo.countAllDrinks(),
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
};
const getDrinkById = async (id) => {
  const drink = await drinkRepo.findDrinkById(id);
  if (!drink) {
    throw new NotFound("Drink not found.");
  }
  return drink;
};
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
};
const getDrinkByName = async (name) => {
  name = name.trim();

  const drinks = await drinkRepo.findDrinkByNameFullTextSearch(name);

  const escapeRegex = (name) => name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regexPattern = new RegExp(escapeRegex, "i");

  if (drinks.length === 0) {
    drinks = await drinkRepo.findDrinkByNameRegex(regexPattern);
  }

  if (drinks.length === 0) {
    throw new NotFound("Drink not found.");
  }

  return drinks;
};
const getCategories = async () => {
  const categories = await drinkRepo.getCategories();

  return categories;
};
module.exports = {
  updateDrink,
  createDrink,
  getAllDrinks,
  getDrinkById,
  deleteDrink,
  getIngredientsRecipe,
  getDrinkByName,
  getDrinkByCategory,
  getCategories,
};
