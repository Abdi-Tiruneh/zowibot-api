const express = require("express");
const { createUser, getUsers, me, updateUser } = require("./walletController");

const { validateUser } = require("./walletModel");
const validate = require("../../middleware/validateReqBody");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/", validate(validateUser), createUser);
router.get("/", [auth, admin], getUsers);
router.get("/me", auth, me);
router.put("/", auth, updateUser);

module.exports = router;
