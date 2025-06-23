const express = require('express');
const chatRouter = express.Router();
const {userAuth} = require('../middlewares/auth.middlewares');
const {Chat} = require('../models/chat');

chatRouter.get("/chat/:targetUserId", userAuth, async(req, res) => {
    const { targetUserId } = req.params;
    const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
        }).
            populate({
                path: "messages.sender",
                select: "firstName lastName",
        });

        if(!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });

            await chat.save();
        }

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = chatRouter;