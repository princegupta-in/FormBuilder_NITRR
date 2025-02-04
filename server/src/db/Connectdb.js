const { default: mongoose } = require("mongoose");

require("dotenv").config();
const dbconnect = async()=>{
   await mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("database connected successfully");
}).catch((error)=>{
    console.log("error in database connection",error);
})}

module.exports = dbconnect;