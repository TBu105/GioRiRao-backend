const drinkService = require('../services/drink.service');
const asyncHandler = require('../utils/async.handler.util');
const HttpStatusCodes = require('../config/http.status.config');
const uploadService = require('../services/upload.service');

const createDrink = asyncHandler(async (req, res) => {
    const drink = await drinkService.createDrink(req.body);
    res.status(HttpStatusCodes.CREATED.code).json({
        message: 'Create drink successfully, image is processing...',
        drink,
    });
    const thumbnailUpload = await uploadService.uploadImage(req.fields.thumbnail, {
        folderName: "drinkThumbnails",
        imgHeight: 300,
        imgWidth: 300,
    });
    const imagesUpload = await uploadService.uploadImages(req.fields.images, {
        folderName: "drinkImages",
        imgHeight: 600,
        imgWidth: 600,
    });
    const newDrinkData = {
        ...drinkData,
        thumbnail: thumbnailUpload.photoUrl,
        images: imagesUpload.photosUrl.map((url, index) => ({
            url,
            alt: `${name} image ${index + 1}`,
            order: index + 1,
        })),
    };
    const newDrink = await drinkService.updateDrink(newDrinkData);
    return newDrink;
});
const updateDrink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedDrink = await drinkService.updateDrink(id, req.body);
    res.status(HttpStatusCodes.OK.code).json({
        message: 'Drink updated successfully',
        updatedDrink,
    });
});
const getAllDrinks = asyncHandler(async (req, res) => {
    const drinks = await drinkService.getAllDrinks();
    res.status(HttpStatusCodes.OK.code).json({
        message: 'Retrieved all drinks successfully',
        drinks,
    });
});
const getDrinkById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const drink = await drinkService.getDrinkById(id);
    res.status(HttpStatusCodes.OK.code).json({
        message: `Retrieved drink details successfully for ID: ${id}`,
        drink,
    });
});
const deleteDrink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedDrink = await drinkService.deleteDrink(id);
    res.status(HttpStatusCodes.OK.code).json({
        message: `Drink deleted successfully for ID: ${id}`,
        deletedDrink,
    });
});
const getIngredientsRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const drink = await drinkService.getIngredientsRecipe(id);
    res.status(HttpStatusCodes.OK.code).json({
        message: `Retrieved ingredients and recipe for drink ID: ${id}`,
        drink,
    });
});
const getDrinkByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const drink = await drinkService.getDrinkByName(name);
    res.status(HttpStatusCodes.OK.code).json({
        message: `Retrieved drink details successfully for name: ${name}`,
        drink,
    });
});
module.exports = {
    updateDrink,
    createDrink,
    getAllDrinks,
    getDrinkById,
    deleteDrink,
    getIngredientsRecipe,
    getDrinkByName,
};