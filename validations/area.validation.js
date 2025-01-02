const Joi = require("joi");
const { objectIdValidator } = require("./common.validation");

const createAreaSchema = Joi.object({
    name: Joi.string().required().min(1).max(100).disallow(null).messages({
        "string.base": "Area name must be a string",
        "string.min": "Area name must be at least 1 character long",
        "string.max": "Area name must be less than or equal to 100 characters",
        "any.required": "Please provide area name",
        "any.invalid": "Area name cannot be null",
    }),
    cityId: Joi.string().required().custom(objectIdValidator).messages({
        "any.required": "Please provide cityId",
        "any.invalid": "Invalid cityId format",
    }),
    managerId: Joi.string().optional().custom(objectIdValidator).messages({
        "any.invalid": "Invalid managerId format",
    }),
});

const updateAreaOtherFieldsSchema = Joi.object({
    name: Joi.string().min(1).max(100).optional().disallow(null).messages({
        "string.base": "Area name must be a string",
        "string.min": "Area name must be at least 1 character long",
        "string.max": "Area name must be less than or equal to 100 characters",
        "any.invalid": "Area name cannot be null",
    }),
    managerId: Joi.string()
        .optional()
        .custom(objectIdValidator)
        .messages({
            "any.invalid": "Invalid managerId format",
        }),
});

// const updateAreaDeletedFieldSchema = Joi.object({
//     deleted: Joi.boolean().required().valid(true, false).messages({
//         "boolean.base": "Deleted must be a boolean",
//         "any.required": "Please provide deleted",
//     }),
// });

module.exports = {
    createAreaSchema,
    updateAreaOtherFieldsSchema,
    // updateAreaDeletedFieldSchema,
};
