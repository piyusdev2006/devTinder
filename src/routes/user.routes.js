const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares/auth.middlewares.js');
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";


// get all the pending connection requests for the loggedInUser
userRouter.get('/user/requests/received', userAuth ,async(req, res) => {
  try {
    const loggedInUser = req.user;
    
      const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId",
          USER_SAFE_DATA
        );

       
      
      res.status(200).json({
          message: "Connection requests fetched successfully",
          data: connectionRequests,
      });
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});


// get all the accepted connection requests that are sent by the user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // console.log(connectionRequests);

    const data = connectionRequests
    .map((request) => {
      if 
    (request?.fromUserId?._id?.toString?.() === loggedInUser._id.toString()
    ) {
        return request?.toUserId || null;
      }
      return request?.fromUserId || null;
    })
    .filter(Boolean); // remove nulls


    res.status(200).json({
      message: "Connection requests fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error in /user/connections:", error);
    res.status(400).json({ message: "Error: " + error.message });
  }
});


// building the feed API for the loggedInUser
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // pagination for feed API
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ],
    }).select("fromUserId toUserId");

    // Collect user IDs to hide from feed
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    

    res.json({
      message: "Feed fetched successfully", 
      data:users
    });
  } catch (error) {
    res.status(400).json({ message: "Error: " + error.message });
  }
})


module.exports = userRouter;