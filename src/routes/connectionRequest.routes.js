const express = require("express");
const connectionRequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

// sendConnection request  / ignored, intrested
connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId } = req.params;
      const { status } = req.params;

      const allowedStatus = ["intrested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: " Invalid status",
        });
      }

      // checking if the user is trying to send a connection request to random user who does not exist in the database
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // checking if the user is trying to send a connection request to himself
      if (fromUserId.toString() === toUserId.toString()) {
        return res.status(400).json({
          message: "You cannot send a connection request to yourself",
        });
      }

      // checking if there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "connection request already exists",
        });
      }

      // new instance of connectionRequest model
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      // saving the connectionRequest in the database
      const data = await connectionRequest.save();
      res.status(200).json({
        message: `${req.user.firstName} is ${status} ${toUser.firstName}`,
        data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = connectionRequestRouter;
