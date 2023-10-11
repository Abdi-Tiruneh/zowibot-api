const express = require("express");
const { createUser, getUsers, me, updateUser } = require("./userController");

const { validateUser } = require("./userModel");
const validate = require("../middleware/validateReqBody");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", validate(validateUser), createUser);
router.get("/", [auth, admin], getUsers);
router.get("/me", auth, me);
router.put("/", auth, updateUser);

module.exports = router;
