const express = require("express");
const router = express.Router();

const {Signupuser,Signinuser} = require("../controllers/Auth");
router.post("/user/signup",Signupuser);
router.post("/user/signin",Signinuser);
module.exports = router;
