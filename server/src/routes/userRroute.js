const express = require("express");
const router = express.Router();

const { Signupuser } = require("../controllers/Auth");
router.post("/user/signup", Signupuser);

const { SigninUser } = require("../controllers/Auth");
router.post("/user/signin", SigninUser);
module.exports = router;
