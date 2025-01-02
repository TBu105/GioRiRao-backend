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
    }),
    areaId: Joi.string().required().custom(objectIdValidator).messages({
        "any.required": "Area ID is required",
        "any.invalid": "Invalid Area ID",
    }),
    cityId: Joi.string().required().custom(objectIdValidator).messages({
        "any.required": "City ID is required",
        "any.invalid": "Invalid City ID",
    }),
    managerId: Joi.string().optional().custom(objectIdValidator).messages({
        "any.invalid": "Invalid Manager ID",
    }),
});

const updateStoreSchema = Joi.object({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        "string.email": "Invalid email format",
    }),
    managerId: Joi.string().optional().custom(objectIdValidator).messages({
        "any.invalid": "Invalid Manager ID",
    }),
});

const updateStoreManagerSchema = Joi.object({
    managerId: Joi.string().required().custom(objectIdValidator).messages({
        "any.required": "Manager ID is required",
        "any.invalid": "Invalid Manager ID",
    }),
});

module.exports = {
    createStoreSchema,
    updateStoreSchema,
    updateStoreManagerSchema,
};
