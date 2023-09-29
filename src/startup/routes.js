const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const users = require("../routers/userRoutes");

module.exports = function setupRoutes(app) {
  app.use(express.json());
  app.use("/api/v1/users", users);
  app.use(errorHandler);
};
