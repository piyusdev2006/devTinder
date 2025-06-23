const socket = require("socket.io");
const crypto = require("crypto");
const {Chat} = require("../models/chat");
const { timeStamp } = require("console");
// const { time } = require("console");


const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
    const io = socket(server, {
      cors: {
        origin: "http://localhost:5173",
      },
    });

    io.on("connection", (socket) => {

        // Handling Events
      socket.on("join-room", ({ firstName, userId, targetUserId }) => {
        // creating a unique room
        const roomId = getSecretRoomId(userId, targetUserId);
        
        console.log(firstName  + " joined room : " + roomId);
        socket.join(roomId);
        });

        socket.on(
          "send-message",
          async ({ firstName, lastName, userId, targetUserId, text }) => {
            

            // save messages to the databse
            try {
              const roomId = getSecretRoomId(userId, targetUserId);
              console.log(
                firstName + " sent a message to room : " + roomId + " : " + text
              );

              let chat = await Chat.findOne({
                participants: { $all: [userId, targetUserId] },
              });

              if (!chat) {
                chat = new Chat({
                  participants: [userId, targetUserId],
                  messages: [],
                });
              }

              // push the message to the chat
              chat.messages.push({ sender: userId, text });

              // save the chat
              await chat.save();

              // emit the message to the room
              io.to(roomId).emit("messageReceived", {
                firstName,
                lastName,
                text,
                timeStamp: new Date(),
              });

            } catch (error) {
              console.error("Error finding or creating chat:", error);
            }
          }
        );

        socket.on("disconnect", () => {});
    });
};

module.exports = initializeSocket;