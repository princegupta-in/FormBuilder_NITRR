const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true
    },
    LastName:{
        type:String,
        
        trim:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        
    },
    Password:{
        type:String,
        required:true,
        unique:true,

    },
    ContactNumber:{
        type:String,
        required:true,
        unique:true,
        
    },
    Avtar:{
        type:String,

    },
    Club:{
        type:String,
        required:true,
        trim:true,
    },
    Position:{
        type:String,
        required:true,

    },
    Security_Key:{
        type:String,
        required:true,
    }

});


module.exports = mongoose.model("User",Userschema);