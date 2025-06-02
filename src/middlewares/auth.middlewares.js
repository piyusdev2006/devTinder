/* 
    -> handle auth middleware for all types of the routes 
    -> We don't generally write middleware function code in routing or server file , instead we create a separate folder for and pass it into the api call by requring it in the routing or server file
    -> folder name : middlewares/
*/

// create an userAuth middleware -> th job of this middleware is to read the token from the req.cookies , validate the token, find the user such that the provided token is of a valid user or not
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
  try {
    // Read the token from req.cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedToken;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // when i found the user in the database , i just need to attach the user to the request object
    // Attach user to request object
    req.user = user;

    // if user not found in DB call the next()
    next(); // to moved to next handler
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    res.status(400).json({
      success: false,
      message: "Authentication failed: " + error.message,
    });
  }
}; 

module.exports = {
  userAuth
};