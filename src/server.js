const express = require("express");
const dotenv = require("dotenv");

const logging = require("./config/logging");
const routes = require("./startup/routes");
const { connectToDatabase } = require("./config/database");

dotenv.config();

const app = express();

logging();
routes(app);
connectToDatabase();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
