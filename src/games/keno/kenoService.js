const {
  getOdd,
  getOddsForSelectedNumbers: getOdds,
} = require("./kenoUtils/kenoOdds");

const {
  checkSufficientBalance,
  updateUserWalletAfterKeno,
} = require("../../payment/userWallet/walletService");

const { BadRequestError } = require("../../errors/CustomErrors");

// Define constants
const NUM_KENO_NUMBERS = 20;
const MIN_KENO_NUMBER = 1;
const MAX_KENO_NUMBER = 80;

function getOddsForSelectedNumbers(numberOfSelectedNumbers) {
  if (
    isNaN(numberOfSelectedNumbers) ||
    numberOfSelectedNumbers < 1 ||
    numberOfSelectedNumbers > 6
  )
    throw new BadRequestError(
      "Invalid selectedNumbers value. Number of selected numbers must be between 1 and 6."
    );

  return getOdds(numberOfSelectedNumbers);
}

function quickPickNumbers(numberOfSelectedNumbers) {
  if (
    isNaN(numberOfSelectedNumbers) ||
    numberOfSelectedNumbers < 1 ||
    numberOfSelectedNumbers > 6
  )
    throw new BadRequestError(
      "Invalid selectedNumbers value. Number of selected numbers must be between 1 and 6."
    );

  return generateNumbers(numberOfSelectedNumbers);
}

async function placeBet(user, kenoReq) {
  const betAmount = kenoReq.betAmount;
  checkSufficientBalance(betAmount, user);

  const playerNumbers = kenoReq.playerNumbers.sort((a, b) => a - b);
  const kenoNumbers = generateNumbers(NUM_KENO_NUMBERS);
  const matchedNumbers = compareSelectedNumbers(kenoNumbers, playerNumbers);
  const winningOdd = getOdd(playerNumbers.length, matchedNumbers.length);

  const wallet = await updateUserWalletAfterKeno(betAmount, user, winningOdd);

  return generateKenoResponse(
    kenoNumbers,
    playerNumbers,
    matchedNumbers,
    winningOdd,
    betAmount,
    wallet.balance
  );
}

function generateNumbers(numberOfSelectedNumbers) {
  const uniqueNumbers = new Set();
  const pickedNumbers = [];

  while (uniqueNumbers.size < numberOfSelectedNumbers) {
    const number =
      Math.floor(Math.random() * (MAX_KENO_NUMBER - MIN_KENO_NUMBER + 1)) +
      MIN_KENO_NUMBER;

    if (!uniqueNumbers.has(number)) {
      uniqueNumbers.add(number);
      pickedNumbers.push(number);
    }
  }

  // Sort the generated numbers in ascending order
  pickedNumbers.sort((a, b) => a - b);

  return pickedNumbers;
}

function compareSelectedNumbers(kenoNumbers, playerNumbers) {
  const matchedNumbers = [];

  for (const playerNumber of playerNumbers) {
    if (kenoNumbers.includes(playerNumber)) {
      matchedNumbers.push(playerNumber);
    }
  }

  return matchedNumbers;
}

function generateKenoResponse(
  kenoNumbers,
  playerNumbers,
  matchedNumbers,
  winningOdds,
  betAmount,
  balance
) {
  const response = {};

  // Set the kenoNumbers, playerNumbers, and matchedNumbers
  response.kenoNumbers = kenoNumbers;
  response.playerNumbers = playerNumbers;
  response.matchedNumbers = matchedNumbers;

  // Calculate the totalMatchedNumbers
  response.totalMatchedNumbers = matchedNumbers.length;

  // Create the Winnings object and set its fields
  const winnings = {};
  winnings.winningOdds = winningOdds;
  winnings.betAmount = betAmount;
  winnings.prizeAmount = winningOdds * betAmount;

  // Set the winnings in the response
  response.winnings = winnings;

  // Create the userWallet object and set its fields
  const userWallet = {};
  userWallet.balance = balance;

  // Set the userWallet in the response
  response.userWallet = userWallet;

  return response;
}

module.exports = { getOddsForSelectedNumbers, placeBet, quickPickNumbers };
