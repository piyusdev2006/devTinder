const express = require('express');
const authRouter = express.Router();   // creating router
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");
const validator = require("validator");
const bcrypt = require("bcryptjs");



// creation and validation of signUp API and password encryption is also done
authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // saving the user in the database and passing the token and send back the user 
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.json(
      {
        message: "user added successfully",
        data: savedUser
      }
    );
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});



// creating login API with basic authentication
authRouter.post("/login", async (req, res) => {
  try {
    // Extracting emil and password from req.body for logging
    const { email, password } = req.body;

    // checking that the user exist in database or not
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User doesn't exist.");
    }

    // validating the email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid credential.");
    }

    // password input by user
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      
      // JWT logic implemented in userSchema and offloaded here
      const token = await user.getJWT();

      // sending cookies along with Jwt token to user
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      });

      // sending response back to the user
      res.send(user);
    } else {
      throw new Error("Invalid credential.");
    }
  } catch (error) {
    res.status(400).send("Error logging in :" + error.message);
  }
});


// creating logout API just by expiring the token
authRouter.post("/logout", async (req, res) => {
  // for big application logout APIs need cleanup activities like some logs and sessions from DB
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    // .send(); // here we can chain the response
  res.send("Logout Successful..");
})

module.exports = authRouter;
