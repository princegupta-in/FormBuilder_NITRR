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
router.get("/logout", auth, (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging out",
            error: error.message
        });
    }
});
module.exports =  router;