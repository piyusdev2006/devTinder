const mongoose = require("mongoose");
const validator = require("validator");

// userSchema creation 
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 13,
      max: 100,
    },
    gender: {
      type: String,
      // adding custom validate function
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
      // or enum: ['male', 'female', 'other'],
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("The photo Url is Invalid" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default description about the user",
      maxlength: 300,
    },
    skills: {
      type: [String],
      validate(arr) {
        if (arr.length > 7) {
          throw new Error("You can add up to 7 skills only");
        }
      },
    },
  },
  { timestamps: true }
);


// creating mongoose model
const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports = mongoose.model("User", userSchema);
