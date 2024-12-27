const Headquarter = require("../models/Headquarter");

const createHeadquarter = async (headquarterData) => {
  const headquarter = new Headquarter(headquarterData);
  return await headquarter.save();
};

module.exports = {
  createHeadquarter,
};
