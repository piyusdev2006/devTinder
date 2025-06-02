const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares/auth.middlewares.js');
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");


const USER_SAFE_DATA = {
  firstName: 1,
  lastName: 1,
  photoUrl: 1,
  age: 1,
  gender: 1,
  about: 1,
  skills: 1,
};


// get all the pending connection requests for the loggedInUser
userRouter.get('/user/requests/received', userAuth ,async(req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
      const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId",
          USER_SAFE_DATA
        );

        if (!connectionRequests) {
          return res.status(404).json({ message: "No connection requests" });
        }
    
      const data = connectionRequests.map((request) => {
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
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);


    // 🔄 Modified: return the other user's object directly
    const data = connectionRequests.map((request) => {
      const connectionUser = request.fromUserId._id.equals(loggedInUser)
        ? request.toUserId
        : request.fromUserId;
      
      return {
        connectionId: request._id,
        user: {
          _id: connectionUser._id,
          firstName: connectionUser.firstName,
          lastName: connectionUser.lastName,
          imgURL: connectionUser.imgURL,
          age: connectionUser.age,
          gender: connectionUser.gender,
          about: connectionUser.about,
          // Add any other user fields you want to include
        },
      }
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

    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // find all the connections of the loggedInUser(sent + received)
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ],
    }).select("fromUserId toUserId status");

    // Hide the user
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((request) => {
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