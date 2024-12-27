const mongoose = require('mongoose')

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }
};

module.exports = isValidObjectId;
