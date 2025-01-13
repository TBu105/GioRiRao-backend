const Joi = require("joi");

const createToppingSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Topping name must be a string",
    "string.empty": "Topping name is required",
    "any.required": "Please provide topping name",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Topping price must be a number",
    "number.min": "Topping price cannot be negative",
    "any.required": "Please provide topping price",
  }),
});

// Export the validation schema
module.exports = { createToppingSchema };
