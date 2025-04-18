const Joi = require("joi");
const { objectIdValidator } = require("./common.validation");

const createStoreSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Store name is required",
    "string.empty": "Store name cannot be empty",
  }),
  address: Joi.string().required().messages({
    "any.required": "Store address is required",
    "string.empty": "Store address cannot be empty",
  }),
  phone: Joi.string().optional().messages({
    "string.base": "Phone must be a string",
    "string.empty": "Phone number cannot be empty",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
    "string.base": "Email must be a string",
  }),
  managerId: Joi.string().optional().custom(objectIdValidator).messages({
    "any.invalid": "Invalid Manager ID",
  }),
  staffs: Joi.array()
    .items(Joi.string().custom(objectIdValidator))
    .optional()
    .messages({
      "array.base": "Staffs must be an array of ObjectIds",
      "any.invalid": "Invalid Staff ID",
    }),
  areaId: Joi.string().required().custom(objectIdValidator).messages({
    "any.required": "Area ID is required",
    "any.invalid": "Invalid Area ID",
  }),
});

const updateStoreSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Store name cannot be empty",
  }),
  address: Joi.string().messages({
    "string.empty": "Store address cannot be empty",
  }),
  phone: Joi.string().optional().messages({
    "string.base": "Phone must be a string",
    "string.empty": "Phone number cannot be empty",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
    "string.base": "Email must be a string",
  }),
  managerId: Joi.string().optional().custom(objectIdValidator).messages({
    "any.invalid": "Invalid Manager ID",
  }),
  staffs: Joi.array()
    .items(Joi.string().custom(objectIdValidator))
    .optional()
    .messages({
      "array.base": "Staffs must be an array of ObjectIds",
      "any.invalid": "Invalid Staff ID",
    }),
  areaId: Joi.string().custom(objectIdValidator).messages({
    "any.invalid": "Invalid Area ID",
  }),
}).min(1); // Đảm bảo phải có ít nhất 1 field được cập nhật

// Nếu bạn muốn cho phép gửi object rỗng (không khuyến khích), thì bỏ `.min(1)`

const updateStaffSchema = Joi.object({
  staffs: Joi.array()
    .items(Joi.string().custom(objectIdValidator))
    .required()
    .messages({
      "array.base": "Staffs must be an array.",
      "string.base": "Each staff member ID must be a string.",
      "any.invalid": "Invalid staff member ID.",
    }),
});

const updateStoreManagerSchema = Joi.object({
  managerId: Joi.string().optional().custom(objectIdValidator).messages({
    "any.required": "Manager ID is required",
    "any.invalid": "Invalid Manager ID",
  }),
});
const deleteStaffsSchema = Joi.object({
  staffs: Joi.string().optional().custom(objectIdValidator).messages({
    "any.required": "Staffs array is required",
    "any.invalid": "Invalid staff ID",
  }),
});
module.exports = {
  createStoreSchema,
  updateStoreSchema,
  updateStoreManagerSchema,
  updateStaffSchema,
  deleteStaffsSchema,
};
