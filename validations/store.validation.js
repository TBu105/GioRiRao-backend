const Joi = require("joi");
const { objectIdValidator } = require("./common.validation");

const createStoreSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Store name is required",
    }),
    address: Joi.string().required().messages({
        "any.required": "Store address is required",
    }),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        "string.email": "Invalid email format",
        "string.base": "Email must be a string",
    }),
    managerId: Joi.string().optional().custom(objectIdValidator).messages({
        "any.invalid": "Invalid Manager ID",
    }),
    staffs: Joi.string().optional().custom(objectIdValidator).messages({
        "any.required": "Staffs ID is required",
        "any.invalid": "Invalid Staffs ID",
    }),
});

const updateStoreSchema = Joi.object({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        "string.email": "Invalid email format",
        "string.base": "Email must be a string",
    }),
});
const updateStaffSchema = Joi.object({
    staffs: Joi.array().items(Joi.string().custom(objectIdValidator)).required().messages({
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
