const Joi = require("joi");
const { objectIdValidator } = require("./common.validation");

const createDrinkSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).disallow(null).messages({
    "string.base": "Drink name must be a string",
    "string.min": "Drink name must be at least 1 characters long",
    "string.max": "Drink name must be less than or equal to 100 characters",
    "any.required": "Please provide drink name",
    "any.invalid": "Drink name cannot be null",
  }),
  category: Joi.string().required().disallow(null).messages({
    "string.base": "Category must be a string",
    "any.required": "Please provide category",
    "any.invalid": "Category cannot be null",
  }),
  description: Joi.string().allow(null).messages({
    "string.base": "Description must be a string",
  }),
  shortDescription: Joi.string().max(100).allow(null).messages({
    "string.base": "Short description must be a string",
    "string.max":
      "Short description must be less than or equal to 100 characters",
  }),
  recipe: Joi.string().allow(null).messages({
    "string.base": "Recipe must be a string",
  }),
  tags: Joi.any(), // Chấp nhận mọi kiểu dữ liệu, sẽ validate trong controller
  customization: Joi.any(), // Chấp nhận mọi kiểu dữ liệu, sẽ validate trong controller
  ingredients: Joi.any(), // Chấp nhận mọi kiểu dữ liệu, sẽ validate trong controller
});

module.exports = { createDrinkSchema };
