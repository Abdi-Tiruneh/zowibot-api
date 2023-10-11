const uuid = require("uuid");

function createTransactionData(userId, amount, tx_ref) {
  return {
    amount: amount,
    tx_ref: tx_ref,
    currency: "ETB",
    transactionStatus: "PENDING",
    userId: userId,
  };
}

function generateUniqueTx_ref() {
  const prefix = "ZOWI-";
  const randomUuid = uuid.v4();

  // Combine the prefix and UUID to create the order ID
  return prefix + randomUuid;
}

module.exports = {
  createTransactionData,
  generateUniqueTx_ref,
};
