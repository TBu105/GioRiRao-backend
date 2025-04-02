const Joi = require("joi");

const tagsSchema = Joi.array()
  .items(
    Joi.string().required().messages({
      "string.base": "Each tag must be a string",
      "any.required": "Please provide a tag",
    })
  )
  .required()
  .messages({
    "array.base": "Tags must be an array",
    "any.required": "Please provide tags",
  });

const customizationSchema = Joi.array()
  .items(
    Joi.object({
      size: Joi.string().required().messages({
        "string.base": "Size must be a string",
        "any.required": "Please provide size",
      }),
      price: Joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be greater than or equal to 0",
        "any.required": "Please provide price",
      }),
    })
  )
  .required()
  .messages({
    "array.base": "Customization must be an array",
    "any.required": "Please provide customization",
  });

const ingredientsSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().required().messages({
        "string.base": "Ingredient name must be a string",
        "any.required": "Please provide ingredient name",
      }),
      quantity: Joi.string().required().messages({
        "string.base": "Ingredient quantity must be a string",
        "any.required": "Please provide ingredient quantity",
      }),
      unit: Joi.string().required().messages({
        "string.base": "Ingredient unit must be a string",
        "any.required": "Please provide ingredient unit",
      }),
    })
  )
  .required()
  .messages({
    "array.base": "Ingredients must be an array",
    "any.required": "Please provide ingredients",
  });

module.exports = { tagsSchema, customizationSchema, ingredientsSchema };
