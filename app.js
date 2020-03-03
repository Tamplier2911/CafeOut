// CORE
const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");

// ERROR HANDLERS
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// ROUTERS
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRouter");

// MIDDLEWARES
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");

// CUSTOM MIDDLEWARES
const logger = require("./middlewares/logger");

const app = express();

// CROSS ORIGIN REQUESTS
app.use(cors());
app.options("*", cors());

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(bodyParser.json());
app.use(cookieParser());

// USE MORGAN IN DEV
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// TESTING MIDDLEWARE
if (process.env.NODE_ENV === "development") app.use(logger);

// text compression middleware
app.use(compression());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
/*
app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to CafeOut API!"
  });
});
*/

// HANDLING UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} route on this server.`,
    404
  );

  next(error);
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
