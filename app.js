const express = require("express");
const morgan = require("morgan");

// ERROR HANDLERS
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// ROUTERS
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRouter");

// CUSTOM MIDDLEWARES
const logger = require("./middlewares/logger");

const app = express();

// USE MORGAN IN DEV
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// TESTING MIDDLEWARE
if (process.env.NODE_ENV === "development") app.use(logger);

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to CafeOut API!"
  });
});

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
