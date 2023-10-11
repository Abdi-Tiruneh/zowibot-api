const {
  createAndSaveSpinToWinPrize,
  getAllPrize,
} = require("./spinToWinPrize/spinToWinPrizeService");

const {
  winningChances: winningChanceService,
  placeBet: placeBetService,
} = require("./spinToWinService");

async function createSpinToWinPrize(_req, res, _next) {
  const spinToWinPrize = await createAndSaveSpinToWinPrize();
  return res.status(201).json(spinToWinPrize);
}

function winningChances(_req, res, _next) {
  return res.status(200).json(winningChanceService());
}

async function spinToWinPrizes(_req, res, _next) {
  const prizes = await getAllPrize();
  return res.status(200).json(prizes);
}

async function placeBet(req, res, _next) {
  const betResponse = await placeBetService(req.user);
  return res.json(betResponse);
}

module.exports = {
  createSpinToWinPrize,
  winningChances,
  placeBet,
  spinToWinPrizes,
};
