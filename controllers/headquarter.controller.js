const headquarterService = require("../services/headquarter.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");

const createHeadquarter = asyncHandler(async (req, res) => {
  const headquarter = await headquarterService.createHeadquarter(req.body);
  res
    .status(HttpStatusCodes.CREATED.code)
    .json({ message: "Create headquarter successfully", headquarter });
});

module.exports = {
  createHeadquarter,
};
