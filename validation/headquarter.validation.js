const Joi = require("joi");
const objectIdValidator = require("./common.validation");

const headquarterSchema = Joi.object({
  name: Joi.string().required().disallow(null).messages({
    "string.base": "Headquarter name must be a string",
    "any.required": "Please provide headquarter name",
    "any.invalid": "Headquarter name cannot be null",
  }),
  managerId: Joi.string()
    .required()
    .disallow(null)
    .custom(objectIdValidator)
    .messages({
      "any.invalid": "Invalid managerId format or cannot be null",
    }),
  totalCities: Joi.number()
    .integer()
    .min(0)
    .required()
    .disallow(null)
    .messages({
      "number.base": "Total cities must be a number",
      "number.min": "Total cities cannot be negative",
      "any.invalid": "Total cities cannot be null",
    }),
  totalAreas: Joi.number().integer().min(0).required().disallow(null).messages({
    "number.base": "Total areas must be a number",
    "number.min": "Total areas cannot be negative",
    "any.invalid": "Total areas cannot be null",
  }),
  totalStores: Joi.number()
    .integer()
    .min(0)
    .required()
    .disallow(null)
    .messages({
      "number.base": "Total stores must be a number",
      "number.min": "Total stores cannot be negative",
      "any.invalid": "Total stores cannot be null",
    }),
});

// Make all fields optional for update
const updateHeadquarterSchema = headquarterSchema.fork(
  Object.keys(headquarterSchema.describe().keys),
  (schema) => schema.optional()
);

module.exports = {
  headquarterSchema,
  updateHeadquarterSchema,
};
