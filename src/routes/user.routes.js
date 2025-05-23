const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares/auth.middlewares.js');
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");


const USER_SAFE_DATA = {
  firstName: 1,
  lastName: 1,
  photoUrl: 1,
  bio: 1,
  skills: 1,
  experience: 1,
  education: 1,
  projects: 1,
  certifications: 1,
  interests: 1,
  languages: 1,
  socialLinks: 1,
};


// get all the pending connection requests for the loggedInUser
userRouter.get('/user/requests/received', userAuth ,async(req, res) => {
  try {
      const loggedInUser = req.user;
      const connectionReuqests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId",
          USER_SAFE_DATA
        );
    
      const data = connectionReuqests.map((request) => {
        return {
              _id: request._id,
              status: request.status,
            fromUserId: request.fromUserId,
        };
      });
      
      res.status(200).json({
          message: "Connection requests fetched successfully",
          data,
      });
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});


// get all the accepted connection requests that are sent by the user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionReuqests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);


    // 🔄 Modified: return the other user's object directly
    const data = connectionReuqests.map((request) => {
      return request.fromUserId._id.toString() === loggedInUser._id.toString()
        ? request.toUserId
        : request.fromUserId;
    });

    res.status(200).json({
      message: "Connection requests fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).json("Error: " + error.message);
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

    // find all the connections of the loggedInUser(sent + received)
    const connectionReuqests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ],
    }).select("fromUserId toUserId status");

    // Hide the user
    const hideUsersFromFeed = new Set();
    connectionReuqests.forEach((request) => {
      hideUsersFromFeed.add(request.toUserId.toString());
      hideUsersFromFeed.add(request.fromUserId.toString());
    });
    
    const userFeed = await User.find({
      $and: [
        { _id: { $nin: [...hideUsersFromFeed] } },
        { _id: { $ne: loggedInUser._id } }
      ],
    }).
      select(USER_SAFE_DATA).skip(skip)
      .limit(limit);
    

    res.send(userFeed);
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
})


module.exports = userRouter;