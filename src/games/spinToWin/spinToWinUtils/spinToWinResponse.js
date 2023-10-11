function createWinResponse(drawnNumber, winPrizeInfo, wallet) {
  const response = {
    message: "Congratulations, you've won!",
    drawnNumber: drawnNumber,
    drawnNumberPrize: {
      number: winPrizeInfo.number,
      prize: winPrizeInfo.prize,
    },
    userWallet: {
      balance: wallet.balance,
      currency: wallet.currency,
    },
  };
  return response;
}

function createLoseResponse(drawnNumber, wallet) {
  const response = {
    message: "Better luck next time!",
    drawnNumber: drawnNumber,
    drawnNumberPrize: {
      number: drawnNumber,
      prize: 0,
    },
    userWallet: {
      balance: wallet.balance,
      currency: wallet.currency,
    },
  };
  return response;
}

module.exports = {
  createLoseResponse,
  createWinResponse,
};
