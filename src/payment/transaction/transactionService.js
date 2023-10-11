const { Transaction } = require("./transactionModel");
const {
  createTransactionData,
  generateUniqueTx_ref,
} = require("./transactionUtils");
const {
  initiateTransaction,
  verifyTransaction: chapaVerifyTransaction,
} = require("../chapa/chapaService");

const {
  updateUserWalletAfterTransaction,
} = require("../userWallet/walletService");

const { ResourceNotFoundError } = require("../../errors/CustomErrors");

// Create a new transaction with a user association
async function createTransaction(userId, amount) {
  try {
    const tx_ref = generateUniqueTx_ref();

    const response = await initiateTransaction(amount, tx_ref);
    const transactionData = createTransactionData(userId, amount, tx_ref);

    await Transaction.create(transactionData);

    return response;
  } catch (error) {
    console.error("Error Initiating Transaction:", error);
    throw error;
  }
}

async function verifyTransaction(tx_ref) {
  try {
    const transaction = await getTransactionByTx_ref(tx_ref);
    if (transaction.transactionStatus !== "PENDING")
      throw new ResourceNotFoundError(
        "No pending transaction found with the specified tx_ref."
      );

    const response = await chapaVerifyTransaction(tx_ref);

    await transaction.update({
      reference: response.data.reference,
      transactionStatus: "COMPLETED",
    });

    await updateUserWalletAfterTransaction(
      transaction.userId,
      transaction.amount
    );

    return transaction;
  } catch (error) {
    console.error("Error verifying  Transaction:", error);
    throw error;
  }
}

async function getTransactionByTx_ref(tx_ref) {
  const transaction = await Transaction.findOne({
    where: { tx_ref },
  });

  if (!transaction) throw new ResourceNotFoundError("Transaction not found");

  return transaction;
}

module.exports = {
  createTransaction,
  verifyTransaction,
};
