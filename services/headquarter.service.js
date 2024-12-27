const headquarterRepository = require("../repositories/headquarter.repo");
const { BadRequest } = require("../core/error.response.config");
const removeNullUndefinedFields = require("../utils/remove.null.fields.util");
const redisClient = require("../config/redis.config");

const createHeadquarter = async (headquarterData) => {
  // Check if a headquarter with the same name already exists
  const existingHeadquarter = await headquarterRepository.findHeadquarterByName(
    headquarterData.name
  );
  if (existingHeadquarter) {
    throw new BadRequest("headquarter with this name already exists.");
  }
  // Create the headquarter
  return await headquarterRepository.createHeadquarter(headquarterData);
};

module.exports = {
  createHeadquarter,
};
