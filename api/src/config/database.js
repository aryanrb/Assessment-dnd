const mongoose = require("mongoose");
const { DB } = require("./index");

const mongoURI = DB.URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
