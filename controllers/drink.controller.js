const drinkService = require("../services/drink.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const uploadService = require("../services/upload.service");
const {
  ingredientsSchema,
  customizationSchema,
  tagsSchema,
} = require("../validations/stringtoarray.validation");
const parseAndValidateArray = (data, schema, fieldName) => {
  let parsedData;
  // Nếu dữ liệu là chuỗi, chuyển thành array
  if (typeof data === "string") {
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      return { error: `${fieldName} must be a valid JSON array.` };
    }
  } else {
    parsedData = data;
  }

  // Validate với Joi schema
  const { error } = schema.validate(parsedData);
  if (error) return { error: error.details[0].message };

  return { value: parsedData };
};

const createDrink = asyncHandler(async (req, res) => {
  const thumbnailUpload = await uploadService.uploadImage(
    req.files.thumbnail[0],
    {
      folderName: "drinkThumbnails",
      imgHeight: 300,
      imgWidth: 300,
    }
  );

  const newDrinkData = {
    thumbnail: thumbnailUpload.photoUrl,
  };
  const tagsResult = parseAndValidateArray(req.body.tags, tagsSchema, "Tags");
  if (tagsResult.error)
    return res.status(400).json({ message: tagsResult.error });
  req.body.tags = tagsResult.value;
  const customizationResult = parseAndValidateArray(
    req.body.customization,
    customizationSchema,
    "Customization"
  );
  if (customizationResult.error)
    return res.status(400).json({ message: customizationResult.error });
  req.body.customization = customizationResult.value;
  const ingredientsResult = parseAndValidateArray(
    req.body.ingredients,
    ingredientsSchema,
    "Ingredients"
  );
  if (ingredientsResult.error)
    return res.status(400).json({ message: ingredientsResult.error });
  req.body.ingredients = ingredientsResult.value;

  const slug = req.body.name.toLowerCase().replace(/[\s_]+/g, "-"); //toLowerCase chuyển sang chữ thường, replace thay thế khoảng trắng và dấu gạch dưới bằng dấu gạch ngang
  req.body.slug = slug;
  const drink = await drinkService.createDrink(req.body);
  res.status(HttpStatusCodes.CREATED.code).json({
    message: "Create drink successfully, image is processing...",
    drink,
  });

  const newDrink = await drinkService.updateDrink(drink._id, newDrinkData);
  return newDrink;
});
const updateDrink = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Chuyển đổi dữ liệu từ string sang array nếu cần
  if (typeof req.body.tags === "string") {
    req.body.tags = JSON.parse(req.body.tags);
  } 

  if (typeof req.body.customization === "string") {
    req.body.customization = JSON.parse(req.body.customization);
  }

  if (typeof req.body.ingredients === "string") {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  }
  const tagsResult = parseAndValidateArray(req.body.tags, tagsSchema, "Tags");
  if (tagsResult.error)
    return res.status(400).json({ message: tagsResult.error });
  req.body.tags = tagsResult.value;
  console.log("data drink update", req.body);
  const updatedDrink = await drinkService.updateDrink(id, req.body);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Drink updated successfully",
    updatedDrink,
  });
});

const getAllDrinks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "-createdAt";
  const drinks = await drinkService.getAllDrinks({ page, limit, sort });
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Retrieved all drinks successfully",
    ...drinks,
  });
});

const getDrinkById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const drink = await drinkService.getDrinkById(id);
  return res.status(HttpStatusCodes.OK.code).json({
    message: `Retrieved drink details successfully for ID: ${id}`,
    drink,
  });
});
const deleteDrink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedDrink = await drinkService.deleteDrink(id);
  return res.status(HttpStatusCodes.OK.code).json({
    message: `Drink deleted successfully for ID: ${id}`,
    deletedDrink,
  });
});
const getIngredientsRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const drink = await drinkService.getIngredientsRecipe(id);
  return res.status(HttpStatusCodes.OK.code).json({
    message: `Retrieved ingredients and recipe for drink ID: ${id}`,
    drink,
  });
});
const getDrinkByName = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const drinks = await drinkService.getDrinkByName(name);
  return res.status(HttpStatusCodes.OK.code).json({
    message: `Retrieved drink details successfully for name: ${name}`,
    drinks,
  });
});
const getDrinkByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "-createdAt";
  const drinks = await drinkService.getDrinkByCategory(category, {
    page,
    limit,
    sort,
  });
  return res.status(HttpStatusCodes.OK.code).json({
    message: `All drink by ${category}`,
    drinks,
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const categories = await drinkService.getCategories();

  res.status(HttpStatusCodes.OK.code).json({
    message: "Get categories successfully",
    categories,
  });
});
module.exports = {
  updateDrink,
  createDrink,
  getAllDrinks,
  getDrinkById,
  deleteDrink,
  getIngredientsRecipe,
  getDrinkByName,
  getDrinkByCategory,
  getCategories,
};
