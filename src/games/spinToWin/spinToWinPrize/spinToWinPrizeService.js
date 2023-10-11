const SpinToWinPrize = require("./spinToWinPrizeModel");

// Function to create and save instances of SpinToWinPrize with assigned prizes
async function createAndSaveSpinToWinPrize() {
  const uniqueNumbers = generateUniqueRandomNumbers();

  // Define the prize distribution
  const prizeDistribution = [
    { count: 100, prize: 100 },
    { count: 50, prize: 500 },
    { count: 5, prize: 1000 },
    { count: 1, prize: 5000 },
    { count: 1, prize: 10000 },
    { count: 1, prize: 50000 },
    { count: 1, prize: 100000 },
    { count: 1, prize: 500000 },
  ];

  const prizesToCreate = [];

  for (const prizeInfo of prizeDistribution) {
    for (let i = 0; i < prizeInfo.count; i++) {
      const randomNumber = uniqueNumbers.pop();
      if (randomNumber) {
        prizesToCreate.push({
          number: randomNumber,
          prize: prizeInfo.prize,
        });
      }
    }
  }

  // Bulk create the SpinToWinPrize instances
  await SpinToWinPrize.bulkCreate(prizesToCreate);
}

// Function to generate random unique numbers within a range of 1 to 50,000
function generateUniqueRandomNumbers() {
  const totalChances = 160; // 100 => 100 birr, 50 => 500 birr,5 => 1000 birr, 1 => 5000 birr, 1 => 10,000 birr, 1 => 50,000 birr, 1 => 100,000 birr,1 => 500,000 birr
  const range = 50000;
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < totalChances) {
    const randomNumber = Math.floor(Math.random() * range) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

async function selectPrizeByNumber(number) {
  const prizeInfo = await SpinToWinPrize.findOne({
    where: {
      number,
    },
  });

  return prizeInfo;
}

async function updatePrize(prize, transaction) {
  await prize.update({ drawn: true }, { transaction });
}

async function getAllPrize() {
  const prizeInfo = await SpinToWinPrize.findAll({
    attributes: ["number", "prize", "drawn"],
    order: [["number", "ASC"]],
  });
  return prizeInfo;
}

async function updatePrize(prize, transaction) {
  await prize.update({ drawn: true }, { transaction });
}

module.exports = {
  createAndSaveSpinToWinPrize,
  selectPrizeByNumber,
  updatePrize,
  getAllPrize,
};
