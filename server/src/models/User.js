const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true  // Ensures no leading/trailing spaces
    },
    Password: {
        type: String,
        required: true,
        // Removed unique: true
    },
    ContactNumber: {
        type: String,
        required: true,
        unique: true
    },
    Avtar: {
        type: String,
    },
    Club: {
        type: String,
        required: true,
        trim: true,
    },
    Position: {
        type: String,
        required: true,
    },
    Security_Key: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Users_s", UserSchema);
