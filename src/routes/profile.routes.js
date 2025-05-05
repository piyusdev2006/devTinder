const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");
const { validateProfileEditData } = require("../utils/validation.js");

// GET/profile --> getting profile of users
profileRouter.post("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
      // validation of data
    if (!validateProfileEditData(req)) {
        
      throw new Error("Invalid Edit Request");
        // return res.status(400).send();
    }
    // 
    const loggedInUser = req.user;

    // Editing profile of the logged in user
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({ message: `${loggedInUser.firstName} your profile is updated`, data: loggedInUser });
    
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
})

module.exports = profileRouter;
