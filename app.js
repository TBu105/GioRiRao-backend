const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");

const app = express();

const ErrorHandler = require("./middlewares/error.handler.middleware");
const NotFound = require("./middlewares/not.found.middleware");

// db
require("./config/connect.db.config");

// essential packages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./config/swagger.config")));


// Routes
app.use("/api/v1", require("./routes/index.route"));

app.use(NotFound);

app.use(ErrorHandler);

module.exports = app;
