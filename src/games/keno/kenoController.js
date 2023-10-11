const {
  getOddsForSelectedNumbers: getOdds,
  placeBet: placeBetService,
  quickPickNumbers: quickPickNumbersService,
} = require("./kenoService");

function getOddsForSelectedNumbers(req, res, _next) {
  const selectedNumbers = Number(req.query.selectedNumbers);

  const odds = getOdds(selectedNumbers);

  // Convert the Map to a plain object
  const oddsObject = Object.fromEntries(odds);

  return res.status(200).json(oddsObject);
}

function quickPickNumbers(req, res, _next) {
  const selectedNumbers = Number(req.query.selectedNumbers);
  const pickedNumbers = quickPickNumbersService(selectedNumbers);

  return res.status(200).json(pickedNumbers);
}

async function placeBet(req, res, _next) {
  const kenoReq = req.body;
  const user = req.user;

  const kenoResponse = await placeBetService(user, kenoReq);
  return res.json(kenoResponse);
}

module.exports = {
  getOddsForSelectedNumbers,
  placeBet,
  quickPickNumbers,
};
