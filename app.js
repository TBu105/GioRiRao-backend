const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const ErrorHandler = require("./middlewares/error.handler.middleware");
const NotFound = require("./middlewares/not.found.middleware");

// db
require("./config/connect.db.config");

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // Include credentials if needed (e.g., cookies)
  })
);

// essential packages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/api/v1", require("./routes/index.route"));

app.use(NotFound);

app.use(ErrorHandler);

module.exports = app;
