const Drink = require("../models/Drink");

const createIngredientsList = async () => {
  const mySet = new Set();
  const drinks = await Drink.find();

  for (const drink of drinks) {
    for (const item of drink.ingredients) {
      mySet.add(item.name);
    }
  }

  console.log("mySet", mySet);
};

createIngredientsList();
