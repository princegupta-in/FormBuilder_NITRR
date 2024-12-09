const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Keys = require("../models/Security_Keys.js");
const jwt = require("jsonwebtoken");

exports.Signupuser = asyncHandler(async (req, res) => {

    const { FirstName, LastName, Email, Password, ContactNumber,
        Club, Position, Security_Key
    } = req.body;

    if (!FirstName || !LastName || !Email || !Password || !ContactNumber || !Club || !Position || !Security_Key) {
        throw new ApiError(400, "Please give All details");
    }

    const isuserexist = await Keys.find({ $and: [{ key_value: Security_Key }, { isUsed: false }] });
    const isAuserWithSameEmail = await User.find({ Email: Email });
    console.log("user: ", isAuserWithSameEmail);
    if (!isuserexist) {
        throw new ApiError(401, "Security key is either wrong or it is already used");
    }
    if (isAuserWithSameEmail.length != 0) {
        throw new ApiError(401, "User` Already Exist,Please try with another Email");
    }

    const Makesecure = await Keys.findOneAndUpdate({ key_value: Security_Key }, { isUsed: true }, { new: true });

    if (!Makesecure) {
        throw new ApiError(500, "Something went wrong!");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const hashed_key = await bcrypt.hash(Security_Key, 10);
    const newuser = await User.create({
        FirstName, LastName, Email, Password: hashedPassword
        , ContactNumber, Club, Position, Security_Key: hashed_key
    }
    );

    if (!newuser) {
        throw new ApiError(500, "Something went wrong with our side please try again Later");
    }

   

    res.status(201).json(new ApiResponse(201, newuser, "User Registered Successfully!"));

})


exports.SigninUser = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        throw new ApiError(400, "Please provide both email and password");
    }

    const user = await User.findOne({ Email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    if(bcrypt.compare(Password,user.Password))
        {
            //create a token and send a succsess response
            const payload = {
                Email:user.Email,
                id:user._id,
                
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
                succsess:true,
                message:"User logged in sucseesfully",
                user:{user,
                    token}
            })
        }
        else
        {
            return res.status(402).json({
                succsess:false,
                message:"incorrect password"
            })
        }

     //return res.status(200).json(new ApiResponse(200, "Sign in successful", { userId: user._id }));
});
