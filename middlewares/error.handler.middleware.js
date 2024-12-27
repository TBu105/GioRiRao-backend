require("dotenv").config();

const ErrorHandler = (req, res, error) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "dev" ? error.stack : {},
  });
};

module.exports = ErrorHandler;
