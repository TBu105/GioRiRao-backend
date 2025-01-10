const Joi = require("joi");

const createAreaSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).disallow(null).messages({
    "string.base": "Area name must be a string",
    "string.min": "Area name must be at least 1 character long",
    "string.max": "Area name must be less than or equal to 100 characters",
    "any.required": "Please provide area name",
    "any.invalid": "Area name cannot be null",
  }),
});

const updateAreaOtherFieldsSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional().disallow(null).messages({
    "string.base": "Area name must be a string",
    "string.min": "Area name must be at least 1 character long",
    "string.max": "Area name must be less than or equal to 100 characters",
    "any.invalid": "Area name cannot be null",
  }),
});

module.exports = {
  createAreaSchema,
  updateAreaOtherFieldsSchema,
};
