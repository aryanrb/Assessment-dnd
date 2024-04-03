const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

require("./config/database");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

module.exports = app;
