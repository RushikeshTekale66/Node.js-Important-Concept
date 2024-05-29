const mongoose = require('mongoose');

// Schema for collection
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    }
},
    { timestamps: true })

// Modele ie collection creation
const User = mongoose.model("users", userSchema);

module.exports = User;