const { BadRequest } = require("../config/error.response.config");

const NotFound = (req, res, next) => {
  const error = new BadRequest("Page Not Found");
  error.status = 404;
  next(error);
};

module.exports = NotFound;
