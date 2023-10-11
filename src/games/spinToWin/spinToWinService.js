const {
  selectNumber,
} = require("./selectedNumber/spinToWinDrawnNumberService");
const {
  selectPrizeByNumber,
  updatePrize,
} = require("./spinToWinPrize/spinToWinPrizeService");
const {
  validateSufficientBalanceForBet,
  updateUserWalletAfterSpinToWin: updateUserWallet,
} = require("../../payment/userWallet/walletService");

const {
  createLoseResponse,
  createWinResponse,
} = require("./spinToWinUtils/spinToWinResponse");

const {
  startTransaction,
  rollbackTransaction,
  commitTransaction,
} = require("../../config/database");

function winningChances() {
  return [
    { count: "1 number", prize: "500,000 Birr" },
    { count: "1 number", prize: "100,000 Birr" },
    { count: "1 number", prize: "50,000 Birr" },
    { count: "1 number", prize: "10,000 Birr" },
    { count: "1 number", prize: "5000 Birr" },
    { count: "5 numbers", prize: "1000 Birr" },
    { count: "50 numbers", prize: "500 Birr" },
    { count: "100 numbers", prize: "100 Birr" },
  ];
}

async function placeBet(user) {
  let transaction;
  const betAmount = 20;
  try {
    transaction = await startTransaction();

    validateSufficientBalanceForBet(betAmount, user);

    const drawnNumber = await selectNumber(user.id);
    const prizeInfo = await selectPrizeByNumber(drawnNumber);

    let wallet;

    if (prizeInfo && !prizeInfo.drawn) {
      const winningAmount = prizeInfo.prize;
      wallet = await updateUserWallet(user, winningAmount, transaction);
      await updatePrize(prizeInfo, transaction);
      await commitTransaction(transaction);
      return createWinResponse(drawnNumber, prizeInfo, wallet);
    }

    wallet = await updateUserWallet(user, -betAmount, transaction);
    await commitTransaction(transaction);
    return createLoseResponse(drawnNumber, wallet);
  } catch (error) {
    if (transaction) await rollbackTransaction(transaction);
    throw error;
  }
}

module.exports = { winningChances, placeBet };
