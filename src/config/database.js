require("dotenv").config();

// here we import mongoose
const mongoose = require("mongoose");

// to connect to  cluster NamasteNoodejs ,simplr query is :
const MONGODB_URL = process.env.MONGODB_URI;  // password updated with this "?retryWrites=true&w=majority"

const connectToDB = async () => {
  await mongoose.connect(
    MONGODB_URL              
  );
};

module.exports = {
  connectToDB
};
