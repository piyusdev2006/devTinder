// importing express module
const express = require("express");
const { connectToDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

// middlewares
app.use(express.json());
app.use(cookieParser());

// creation and validation of signUp API and password encryption is also done
app.post("/signup", async (req, res) => {
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

    // always use try-catch whenever make an asynchronous call

    // saving the user in the database
    await user.save();
    res.send("User saved successfully");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// creating login API with basic authentication
app.post("/login", async (req, res) => {
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
      res.send("Login Successful !!!!");
    } else {
      throw new Error("Invalid credential.");
    }
  } catch (error) {
    res.status(400).send("Error logging in :" + error.message);
  }
});

// GET/profile --> getting profile of users
app.post("/profile", userAuth, async (req, res) => {
  try {

    const user = req.user;
    res.send(user);

  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});


// sendConnection request 
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  // sending a connection request

  res.send(`${user.firstName} sent the connection request...`)

  
})

connectToDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running on the port 3000..");
    });
  })
  .catch((err) => {
    console.error("Database connection lost");
  });
