const mongoose = require("mongoose");

const keyschema = new mongoose.Schema({
    key_value:{
        type:String,
        required:true,
    },
    isUsed:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Security_keys",keyschema);