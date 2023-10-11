const {
  createTransaction: createTransactionService,
  verifyTransaction: verifyTransactionService,
} = require("./transactionService");

async function createTransaction(req, res, _next) {
  const { id } = req.user;
  const { amount } = req.body;

  const transaction = await createTransactionService(id, amount);
  return res.status(201).json(transaction);
}

async function verifyTransaction(req, res, _next) {
  const transaction = await verifyTransactionService(req.params.tx_ref);

  return res.status(200).json(transaction);
}

module.exports = {
  createTransaction,
  verifyTransaction,
};
