const express = require("express");
const router = express.Router();
const {
  createSpinToWinPrize,
  winningChances,
  spinToWinPrizes,
  placeBet,
} = require("./spinToWinController");

const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

router.post("/prizes", [auth, admin], createSpinToWinPrize);
router.get("/winning-chances", winningChances);
router.get("/prizes", spinToWinPrizes);
router.post("/place-bet", [auth], placeBet);

module.exports = router;
