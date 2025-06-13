const express = require("express");
const connectionRequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");
const sendEmail = require("../utils/sendEmail.js");


// sendConnection request  / ignored, intrested
connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId, status } = req.params;
      

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: " Invalid status" + status});
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found!",
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

      // sending email to the user
      const emailResponse = await sendEmail.run("A new friend request from " + req.user.firstName,
        req.user.firstName + " is " + status + " in " + toUser.firstName
      );
      console.log("Email Response:", emailResponse);
      
      res.status(201).json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// review connection request : accept / reject
connectionRequestRouter.post("/request/review/:status/:requestId" , userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // validate the status
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection request not found",
      });
    }
    
    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.status(200).json({
      message: `${loggedInUser.firstName} ${status} ${connectionRequest.fromUserId.firstName}'s connection request`,
      data,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = connectionRequestRouter;
