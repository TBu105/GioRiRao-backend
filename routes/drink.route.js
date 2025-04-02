const express = require("express");
const drinkController = require("../controllers/drink.controller");
const validate = require("../middlewares/validation.middleware");
const verifyAccessToken = require("../middlewares/verify.access.token.middleware");
const { uploadDisk } = require("../config/multer.config");
const authorize = require("../middlewares/authorize.middleware");
const { createDrinkSchema } = require("../validations/drink.validation");

const router = express.Router();

router.get("/categories", drinkController.getCategories);
router.get("/search", drinkController.getDrinkByName);

router.patch(
  "/delete/:id",
  //verifyAccessToken,
  //authorize(["admin"]),
  drinkController.deleteDrink
);

router.patch(
  "/:id",
  //verifyAccessToken,
  //(["admin"]),

  drinkController.updateDrink
);

router.get("/:id", drinkController.getDrinkById);

router.get("/:id/ingredients-recipe", drinkController.getIngredientsRecipe);

router.get("/category/:category", drinkController.getDrinkByCategory);
router.post(
  "/",
  uploadDisk.fields([
    { name: "thumbnail", maxCount: 1 }, // Chỉ chấp nhận 1 file cho 'thumbnail'
    { name: "images", maxCount: 10 }, // Chấp nhận tối đa 10 file cho 'images'
  ]),
  validate(createDrinkSchema),
  drinkController.createDrink
);
router.get("/", drinkController.getAllDrinks);

module.exports = router;
