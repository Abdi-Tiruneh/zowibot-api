const kenoOdds = initializeOddsTable();

function initializeOddsTable() {
  const oddsTable = new Map();

  // For six selected numbers
  const sixNumbersOdds = new Map();
  sixNumbersOdds.set(6, 1500.0); // Odds of winning when all 6 numbers match
  sixNumbersOdds.set(5, 50.0); // Odds of winning when 5 numbers match
  sixNumbersOdds.set(4, 5.0); // Odds of winning when 4 numbers match
  sixNumbersOdds.set(3, 1.0); // Odds of winning when 3 numbers match
  oddsTable.set(6, sixNumbersOdds);

  // For five selected numbers
  const fiveNumbersOdds = new Map();
  fiveNumbersOdds.set(5, 500.0); // Odds of winning when all 5 numbers match
  fiveNumbersOdds.set(4, 15.0); // Odds of winning when 4 numbers match
  fiveNumbersOdds.set(3, 2.0); // Odds of winning when 3 numbers match
  oddsTable.set(5, fiveNumbersOdds);

  // For four selected numbers
  const fourNumbersOdds = new Map();
  fourNumbersOdds.set(4, 50.0); // Odds of winning when all 4 numbers match
  fourNumbersOdds.set(3, 5.0); // Odds of winning when 3 numbers match
  fourNumbersOdds.set(2, 1.0); // Odds of winning when 2 numbers match
  oddsTable.set(4, fourNumbersOdds);

  // For three selected numbers
  const threeNumbersOdds = new Map();
  threeNumbersOdds.set(3, 25.0); // Odds of winning when all 3 numbers match
  threeNumbersOdds.set(2, 2.0); // Odds of winning when 2 numbers match
  oddsTable.set(3, threeNumbersOdds);

  // For two selected numbers
  const twoNumbersOdds = new Map();
  twoNumbersOdds.set(2, 10.0); // Odds of winning when both numbers match
  oddsTable.set(2, twoNumbersOdds);

  // For one selected number
  const oneNumberOdds = new Map();
  oneNumberOdds.set(1, 2.0); // Odds of winning when the single number matches
  oddsTable.set(1, oneNumberOdds);

  return oddsTable;
}

function getOdd(numberOfSelectedNumbers, numberOfMatches) {
  const selectedNumbersOdds = kenoOdds.get(numberOfSelectedNumbers);
  if (selectedNumbersOdds)
    return selectedNumbersOdds.get(numberOfMatches) || 0.0;
  else return 0.0; // No odds table for the given number of selected numbers
}

function getOddsForSelectedNumbers(numberOfSelectedNumbers) {
  return kenoOdds.get(numberOfSelectedNumbers);
}

module.exports = {
  getOdd,
  getOddsForSelectedNumbers,
};
