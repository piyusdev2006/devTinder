const mongoose = require("mongoose");


// userSchema creation 
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        }
    },
    { timestamps: true }
);


// creating mongoose model
const User = mongoose.model("User", userSchema);
module.exports = User;
