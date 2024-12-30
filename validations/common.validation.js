const mongoose = require("mongoose");

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid"); // Return error if invalid
  }
  return value; // Return the value if valid
};

module.exports = { objectIdValidator };
