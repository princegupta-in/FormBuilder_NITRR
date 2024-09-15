const express = require("express");
const router = express.Router();

const {Signupuser} = require("../controllers/Auth");
router.post("/user/signup",Signupuser);

module.exports =  router;