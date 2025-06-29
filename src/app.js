require("dotenv").config();

const express = require("express");
const connectToDB  = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

require("./utils/cronjob.js"); // Import the cron job to start it

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


// import the router from routes/
const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const connectionRequestRouter = require("./routes/connectionRequest.routes.js");
const userRouter = require("./routes/user.routes.js");
const paymentRouter = require("./routes/payment.routes.js");
const initializeSocket = require("./utils/socket.js");
const chatRouter = require("./routes/chat.routes.js");

// using the routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

// create server with app as parameter using the express app we have created the server
const server = http.createServer(app);
initializeSocket(server);

// now configuration for server for socket.io and we need this server for initializing socket.io

connectToDB()
  .then(() => {
    console.log("Database connection successful");
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on the port ${process.env.PORT}..`);
    });
  })
  .catch((err) => {
    console.error("Database connection lost");
  });
