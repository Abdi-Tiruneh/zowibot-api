const express = require("express");
const router = express.Router();
const {
  getOddsForSelectedNumbers: getOdds,
  placeBet,
  quickPickNumbers,
} = require("./kenoController");

const validateKenoRequest = require("./kenoUtils/validateKenoRequest");
const validate = require("../../middleware/validateReqBody");
const auth = require("../../middleware/auth");

router.get("/odds", getOdds);
router.get("/quick-pick", quickPickNumbers);
router.post("/place-bet", [auth, validate(validateKenoRequest)], placeBet);

// router.get("/me", auth, me);
// router.put("/", auth, updateUser);

module.exports = router;
