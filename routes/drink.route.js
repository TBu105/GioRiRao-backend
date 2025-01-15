const express = require('express');
const drinkController = require('../controllers/drink.controller');
const validate = require('../middlewares/validation.middleware');
const verifyAccessToken = require('../middlewares/verify.access.token.middleware');
const { uploadDisk } = require("../config/multer.config");
const authorize = require('../middlewares/authorize.middleware');
const { createDrinkSchema, updateDrinkSchema } = require('../validations/drink.validation');

const router = express.Router();

router.post('/', uploadDisk.fields([
    { name: 'thumbnail', maxCount: 1 },  // Chỉ chấp nhận 1 file cho 'thumbnail'
    { name: 'images', maxCount: 10 }     // Chấp nhận tối đa 10 file cho 'images'
]), validate(createDrinkSchema), drinkController.createDrink);
router.put('/:id', drinkController.updateDrink);
router.get('/', drinkController.getAllDrinks);
router.get('/:id', drinkController.getDrinkById);
router.put('/delete/:id', drinkController.deleteDrink);
router.get('/:id/ingredients-recipe', drinkController.getIngredientsRecipe);
router.get('/name/:name', drinkController.getDrinkByName);

module.exports = router;