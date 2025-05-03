// importing express module
const express = require("express");
const { connectToDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());
app.use(cookieParser());


// import the router from routes/
const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const connectionRequestRouter = require("./routes/connectionRequest.routes.js");

// using the routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);


connectToDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running on the port 3000..");
    });
  })
  .catch((err) => {
    console.error("Database connection lost");
  });
