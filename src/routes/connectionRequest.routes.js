const express = require("express");
const connectionRequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");

// sendConnection request
connectionRequestRouter.post(
  "/sendConnectionRequest",
  userAuth,
  async (req, res) => {
    const user = req.user;

    // sending a connection request

    res.send(`${user.firstName} sent the connection request...`);
  }
);

module.exports = connectionRequestRouter;
