const drinkService = require('../services/drink.service');
const asyncHandler = require('../utils/async.handler.util');
const HttpStatusCodes = require('../config/http.status.config');
const uploadService = require('../services/upload.service');

const createDrink = asyncHandler(async (req, res) => {
    const slug = req.body.name.toLowerCase().replace(/[\s_]+/g, '-');//toLowerCase chuyển sang chữ thường, replace thay thế khoảng trắng và dấu gạch dưới bằng dấu gạch ngang
    req.body.slug = slug;
    console.log("body", req.body);
    const drink = await drinkService.createDrink(req.body);
    res.status(HttpStatusCodes.CREATED.code).json({
        message: 'Create drink successfully, image is processing...',
        drink,
    });
    const thumbnailUpload = await uploadService.uploadImage(req.files.thumbnail[0], {
        folderName: "drinkThumbnails",
        imgHeight: 300,
        imgWidth: 300,

    });
    console.log("thumbnailUpload", thumbnailUpload);
    const imagesUpload = await uploadService.uploadImages(req.files.images, {
        folderName: "drinkImages",
        imgHeight: 600,
        imgWidth: 600,
    });

    const newDrinkData = {
        thumbnail: thumbnailUpload.photoUrl,
        images: imagesUpload.photosUrl.map((url, index) => ({
            url,
            alt: `image ${index + 1}`,
            order: index + 1,
        })),
    };
    console.log("newDrinkData", newDrinkData);
    const newDrink = await drinkService.updateDrink(drink._id, newDrinkData);
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "-createdAt";
    const drinks = await drinkService.getAllDrinks({ page, limit, sort });
    res.status(HttpStatusCodes.OK.code).json({
        message: 'Retrieved all drinks successfully',
        ...drinks,
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