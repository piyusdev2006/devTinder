const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");
const { validateProfileEditData, validatePasswordChangeData } = require("../utils/validation.js");
const { User } = require("../models/user.js");
const bcrypt = require("bcryptjs");


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


profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validate input
    if (!validatePasswordChangeData(req)) {
      throw new Error("Invalid password change request");
    }

    const user = req.user;

    // Verify old password
    const isPasswordMatch = await user.validatePassword(oldPassword);
    if (!isPasswordMatch) {
      throw new Error("Old password is incorrect");
    }

    // Validate new password length
    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password - the model's pre-save hook will handle hashing
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.json({
      message: `Password updated successfully for ${user.firstName}`,
      data: user, 

    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
