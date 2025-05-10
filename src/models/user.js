const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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


// creating compound index for email
// userSchema.index({ email: 1 }, { unique: true });


// JWT Handler
userSchema.methods.getJWT = async function () {

  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Strong@786", {
    expiresIn: "7d" 
    
  });
  
  return token;
}  

// password valdation handler
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
}

// creating mongoose model
const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports = mongoose.model("User", userSchema);
