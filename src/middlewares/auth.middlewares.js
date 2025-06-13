
// create an userAuth middleware -> th job of this middleware is to read the token from the req.cookies , validate the token, find the user such that the provided token is of a valid user or not
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
  try {

    // read the toekn from req.cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login");
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET || "Strong@786" );

    const { _id } = decodedToken;
    const user = await User.findById(_id );
    if (!user) {
      throw new Error("User not found");
    }

    // when i found the user in the database , i just need to attach the user to the request object
    req.user = user;

    // if user not found in DB call the next()
    next(); // to moved to next handler

  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
}; 

module.exports = {
  userAuth,
};