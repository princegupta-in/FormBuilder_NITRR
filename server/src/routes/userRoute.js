const express = require("express");
const router = express.Router();

const {Signupuser, SigninUser} = require("../controllers/Auth");
router.post("/user/signup",Signupuser);
router.post("/user/signin",SigninUser);

module.exports =  router;