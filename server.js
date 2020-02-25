const mongoose = require("mongoose");
const dotenv = require("dotenv");

// UNCAUGHT EXCEPTION HANDLER
process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION", err.name, err.message);
  process.emit(1);
});

// Initialization of Dotenv Config
dotenv.config({ path: "./config/config.env" });
// Import instance of app in order to run server
const app = require("./app");

// DB CONNECTION
const db = process.env.DB.replace("*PASSWORD*", process.env.DB_PASSWORD);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connection Successful!");
  });

// SERVER
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode, on http://localhost:${PORT}/`
  );
});

// UNHANDLED REJECTIONS HANDLER
process.on("unhandledRejection", err => {
  console.log("UNDANDLED REJECTION", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// SIGTERM SHUTDOWN HANDLER
process.on("SIGTERM", () => {
  console.log("SIGTERM RECIEVED. Shutting down...");
  server.close(() => {
    console.log("Process terminated...");
  });
});
