const SpinToWinSelectedNumber = require("./spinToWinDrawnNumber");
const {
  startTransaction,
  rollbackTransaction,
  commitTransaction,
} = require("../../../config/database");

// Initialize the list of available numbers (1 to 50000)
const availableNumbers = Array.from({ length: 50000 }, (_, index) => index + 1);

// Shuffle the available numbers
for (let i = availableNumbers.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [availableNumbers[i], availableNumbers[j]] = [
    availableNumbers[j],
    availableNumbers[i],
  ];
}

// Player selection logic with concurrency handling and retry for uniqueness
async function selectNumber(playerId) {
  let transaction;
  try {
    transaction = await startTransaction();

    let selectedNumber;

    // Keep trying until a unique number is found
    while (!selectedNumber) {
      if (availableNumbers.length === 0) {
        throw new Error("All numbers have been selected.");
      }

      const candidateNumber = availableNumbers.pop(); // Get the last number from the shuffled list

      // Check if the candidate number already exists in the database
      const existingNumber = await SpinToWinSelectedNumber.findOne({
        where: { number: candidateNumber },
        transaction,
      });

      if (!existingNumber) {
        selectedNumber = candidateNumber;
      }
    }

    await SpinToWinSelectedNumber.create(
      { number: selectedNumber, playerId },
      { transaction }
    );

    await commitTransaction(transaction);
    return selectedNumber;
  } catch (error) {
    if (transaction) await rollbackTransaction(transaction);
    throw error;
  }
}

module.exports = {
  selectNumber,
};
