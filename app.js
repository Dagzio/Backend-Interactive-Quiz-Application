const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    console.log("Mongo DB succesfully connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// ROUTERS ===================================================================
app.use("/auth", authRouter);
app.use("/users", usersRouter);
// ===========================================================================
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static("public"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const message = error.message;
  res.status(error.status || 500).json({
    message,
  });
});

module.exports = app;
