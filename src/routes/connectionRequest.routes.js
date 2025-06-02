const express = require("express");
const connectionRequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// sendConnection request  / ignored, intrested
connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId, status } = req.params;

      // Validate ObjectId format
      if (!isValidObjectId(toUserId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID format",
        });
      }

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status: ${status}. Allowed values are: ${allowedStatus.join(
            ", "
          )}`,
        });
      }

      // Check if user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Check self-request
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
      res.status(201).json({
        success: true,
        message: "connection request sent successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });


// review connection request : accept / reject
connectionRequestRouter.post("/request/review/:status/:requestId" , userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // Validate ObjectId format
    if (!isValidObjectId(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID format",
      });
    }

    // validate the status
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status: ${status}. Allowed values are: ${allowedStatus.join(
          ", "
        )}`,
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    })
      // we can populate the fromuserId complete object details so that we can send the customised message

      // another way is given in the message response instead of writing this "connectionRequest.fromUserId.firstName", write this "use fromUser.firstName in your response" you will get the response

      .populate("fromUserId", "firstName lastName");

    if (!connectionRequest) {
      return res.status(404).json({
        success: false,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



module.exports = connectionRequestRouter;
