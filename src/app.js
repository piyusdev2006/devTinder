require("dotenv").config();

const express = require("express");
const connectToDB  = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");


// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
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

// using the routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);


connectToDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on the port ${process.env.PORT}..`);
    });
  })
  .catch((err) => {
    console.error("Database connection lost");
  });
