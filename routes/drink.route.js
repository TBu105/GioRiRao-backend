const express = require('express');
const drinkController = require('../controllers/drink.controller');
const validate = require('../middlewares/validation.middleware');
const { createDrinkSchema, updateDrinkSchema } = require('../validations/drink.validation');

const router = express.Router();

router.post('/', validate(createDrinkSchema), drinkController.createDrink);
router.put('/:id', drinkController.updateDrink);
router.get('/', drinkController.getAllDrinks);
router.get('/:id', drinkController.getDrinkById);
router.put('/delete/:id', drinkController.deleteDrink);
router.get('/:id/ingredients-recipe', drinkController.getIngredientsRecipe);
router.get('/name/:name', drinkController.getDrinkByName);

module.exports = router;