/* 
    -> handle auth middleware for all types of the routes 
    -> We don't generally write middleware function code in routing or server file , instead we create a separate folder for and pass it into the api call by requring it in the routing or server file
    -> folder name : middlewares/
*/

// create an userAuth middleware -> th job of this middleware is to read the token from the req.cookies , validate the token, find the user such that the provided token is of a valid user or not

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
  try {

    // read the toekn from req.cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedToken = await jwt.verify(token, "Strong@786");

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
  userAuth
};