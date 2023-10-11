const express = require("express");
const {
  createTransaction,
  verifyTransaction,
} = require("./transactionController");

const { validateTransaction } = require("./transactionModel");
const validate = require("../../middleware/validateReqBody");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/", [auth, validate(validateTransaction)], createTransaction);
router.get("/verify/:tx_ref", verifyTransaction);

module.exports = router;
