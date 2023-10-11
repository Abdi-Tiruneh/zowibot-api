const Wallet = require("./walletModel");
const { BadRequestError } = require("../../errors/CustomErrors");

async function createWallet(user, initialBalance = 10000, currency = "BIRR") {
  const userId = user.id;
  // Create a new user wallet record
  const wallet = await Wallet.create({
    userId,
    balance: initialBalance,
    currency,
  });

  return wallet;
}

function validateSufficientBalanceForBet(betAmount, user) {
  const userBalance = user.Wallet.balance;
  if (betAmount > userBalance) {
    throw new BadRequestError(
      "Insufficient balance. Your balance is not enough for this bet."
    );
  }
}

async function getWalletByUserId(userId) {
  const wallet = await Wallet.findOne({
    where: { userId },
  });

  if (!wallet) throw new Error("Wallet not found");

  return wallet;
}

async function updateUserWalletAfterKeno(betAmount, user, winningOdd) {
  const wallet = user.Wallet;

  if (winningOdd === 1) return; // No need to update the wallet

  let updatedData = {};

  if (winningOdd > 1)
    updatedData.balance = wallet.balance + betAmount * winningOdd;
  else updatedData.balance = wallet.balance - betAmount;

  await wallet.update(updatedData);

  return wallet;
}

async function updateUserWalletAfterSpinToWin(user, amount, transaction) {
  const wallet = user.Wallet;
  const newBalance = parseFloat(wallet.balance) + amount;
  await wallet.update({ balance: newBalance }, { transaction });
  return wallet;
}

async function updateUserWalletAfterTransaction(userId, amount) {
  const wallet = await getWalletByUserId(userId);

  const parsedAmount = parseFloat(amount);
  const newBalance = wallet.balance + parsedAmount;

  await wallet.update({ balance: newBalance });

  return wallet;
}

module.exports = {
  createWallet,
  validateSufficientBalanceForBet,
  updateUserWalletAfterKeno,
  updateUserWalletAfterSpinToWin,
  updateUserWalletAfterTransaction,
};
