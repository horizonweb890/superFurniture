const express = require("express");
const { signUp, login, currentUser } = require("../controller/user.controllers.js");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/current-user", currentUser);

module.exports = router;
