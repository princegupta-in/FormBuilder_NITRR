const express = require("express");
const router = express.Router();
const {auth} = require('../middlewares/Authentication');

const {Signupuser, SigninUser} = require("../controllers/Auth");
router.post("/user/signup",Signupuser);
router.post("/user/signin",SigninUser);
router.get("/currentuser", auth, (req, res) => {
    res.json({ 
        success: true,
        user: req.user 
    });
});

module.exports =  router;