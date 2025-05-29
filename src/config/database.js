require("dotenv").config();

// here we import mongoose
const mongoose = require("mongoose");

// to connect to  cluster NamasteNoodejs ,simplr query is :


const MONGODB_URI = process.env.MONGODB_URL;  // password updated with this "?retryWrites=true&w=majority"

const connectToDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteNode:0ty4z3ZHLivba7qH@akshaysaininode.ycri0.mongodb.net/devTinder?retryWrites=true&w=majority"
  );
};

module.exports = {
  connectToDB
};
