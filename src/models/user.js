const mongoose = require("mongoose");


// userSchema creation 
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);


// creating mongoose model
const User = mongoose.model("User", userSchema);
module.exports = User;
