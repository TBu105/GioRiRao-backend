const Joi = require("joi");
const { objectIdValidator } = require("./common.validation");

const registerStaffSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "any.required": "Please provide email",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Please provide password",
  }),
  name: Joi.string().required().min(1).max(100).messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 1 characters long",
    "string.max": "Name must be less than or equal to 100 characters",
    "any.required": "Please provide name",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string",
    "any.required": "Please provide phone",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Please provide address",
  }),
  // avatar: Joi.string().allow(null).messages({
  //   "string.base": "Avatar must be a string",
  // }),
  role: Joi.string()
    .valid("staffShipper", "staffCashier", "staffBarista", "staffWaiter")
    .required()
    .messages({
      "string.base": "Role must be a string",
      "any.required": "Please provide role",
      "any.invalid": "Invalid role",
    }),
});
const registerAdminSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 1 characters long",
    "string.max": "Name must be less than or equal to 100 characters",
    "any.required": "Please provide name",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "any.required": "Please provide email",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Please provide password",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string",
    "any.required": "Please provide phone",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Please provide address",
  }),
  avatar: Joi.string().allow(null).messages({
    "string.base": "Avatar must be a string",
  }),
  role: Joi.string().valid("admin").required().messages({
    "string.base": "Role must be a string",
    "any.required": "Please provide role",
    "any.invalid": "Invalid role",
  }),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "any.required": "Please provide email",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "any.required": "Please provide password",
  }),
});

module.exports = {
  registerStaffSchema,
  registerAdminSchema,
  loginSchema,
};
