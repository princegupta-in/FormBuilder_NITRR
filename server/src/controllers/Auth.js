const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Keys = require("../models/Security_Keys.js");
const jwt = require("jsonwebtoken");

exports.Signupuser = asyncHandler(async (req, res) => {
    const { FirstName, LastName, Email, Password, ContactNumber, Club, Position, Security_Key } = req.body;

    if (!FirstName || !LastName || !Email || !Password || !ContactNumber || !Club || !Position || !Security_Key) {
        throw new ApiError(400, "Please provide all details");
    }

    const isuserexist = await Keys.findOne({ key_value: Security_Key, isUsed: false });
    const isAuserWithSameEmail = await User.findOne({ Email });

    if (isAuserWithSameEmail) {
        throw new ApiError(401, "User already exists, please try with another email");
    }
    if (!isuserexist) {
        throw new ApiError(401, "Security key is either wrong or it is already used");
    }

    const Makesecure = await Keys.findOneAndUpdate({ key_value: Security_Key }, { isUsed: true }, { new: true });

    if (!Makesecure) {
        throw new ApiError(500, "Something went wrong!");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const hashed_key = await bcrypt.hash(Security_Key, 10);
    const newuser = await User.create({
        FirstName, LastName, Email, Password: hashedPassword, ContactNumber, Club, Position, Security_Key: hashed_key
    });

    if (!newuser) {
        throw new ApiError(500, "Something went wrong on our side, please try again later");
    }

    res.status(201).json(new ApiResponse(201, newuser, "User registered successfully!"));
});

exports.SigninUser = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        throw new ApiError(400, "Please provide both email and password");
    }

    const user = await User.findOne({ Email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    const isPasswordMatch = await bcrypt.compare(Password,user.Password)
    if(isPasswordMatch)
        {
            //create a token and send a success response
            const payload = {
                Email:user.Email,
                id:user._id,
                FirstName:user.FirstName
            }
            const token = jwt.sign(payload,process.env.JWTSECRET,{
                expiresIn:"2h"
            })
            
            user.token = token;
            user.Password = undefined;

            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User logged in successfully",
                user:{user,
                    token}
            })
        }
        else
        {
            return res.status(402).json({
                success:false,
                message:"incorrect password"
            })
        }

     //return res.status(200).json(new ApiResponse(200, "Sign in successful", { userId: user._id }));
});
