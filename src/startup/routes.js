const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const users = require("../userManager/userRoutes");
const transactions = require("../payment/transaction/transactionRoutes");
const keno = require("../games/keno/kenoRoutes");
const spinToWin = require("../games/spinToWin/spinToWinRoutes");

module.exports = function setupRoutes(app) {
  app.use(express.json());
  app.use("/api/v1/users", users);
  app.use("/api/v1/transactions", transactions);
  app.use("/api/v1/keno", keno);
  app.use("/api/v1/spin-to-win", spinToWin);
  app.use(errorHandler);
};
