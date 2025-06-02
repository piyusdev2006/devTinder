const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");
const { validateProfileEditData, validatePasswordChangeData } = require("../utils/validation.js");
const bcrypt = require("bcryptjs");


// GET/profile --> getting profile of users
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});


// PATCH /profile/edit
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);
    
    const loggedInUser = req.user;
    
    Object.keys(req.body).forEach(key => {
      loggedInUser[key] = req.body[key];
    });
    
    await loggedInUser.save();
    
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: loggedInUser
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

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
      success: true,
      message: `Password updated successfully for ${user.firstName}`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = profileRouter;
