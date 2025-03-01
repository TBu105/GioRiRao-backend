const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const toppingService = require("../services/topping.service");
const uploadService = require("../services/upload.service");
const { createToppingSchema } = require("../validations/topping.validation");

const createTopping = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new BadRequest("Please provide topping image");
  }

  const { validationError } = createToppingSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validationError) {
    const message = validationError.map((detail) => detail.message).join(", ");
    throw new BadRequest(message);
  }

  const newTopping = await toppingService.createTopping(req.body);

  res.status(HttpStatusCodes.CREATED.code).json({
    message: "Topping created successfully, image is processing...",
    newTopping,
  });

  const toppingThumbnail = await uploadService.uploadImage(req.file, {
    folderName: "toppingThumbnails",
    imgHeight: 300,
    imgWidth: 300,
  });

  let payload = {
    thumbnail: toppingThumbnail.photoUrl,
  };

  await toppingService.updateTopping(newTopping._id, payload);
});

const getAllToppings = asyncHandler(async (req, res) => {
  const toppings = await toppingService.getAllToppings();

  res.status(HttpStatusCodes.OK.code).json({
    message: "Get all toppings successfully",
    toppings,
  });
});
const updateTopping = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateTopping = await toppingService.updateTopping(id, req.body);
  res.status(HttpStatusCodes.OK.code).json({
    message: "Update toppings successfully",
    updateTopping,
  });
});
const deleteTopping = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTopping = await toppingService.deleteTopping(id);

  res.status(HttpStatusCodes.OK.code).json({
    message: "Topping deleted successfully",
    deletedTopping,
  });
});
module.exports = {
  deleteTopping,
  updateTopping,
  createTopping,
  getAllToppings,
};
