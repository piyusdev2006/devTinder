require("dotenv").config();

// here we import mongoose
const mongoose = require("mongoose");

// to connect to  cluster NamasteNoodejs ,simplr query is :
const MONGODB_URI = process.env.MONGODB_URL;

const connectToDB = async () => {
  await mongoose.connect(
    
    MONGODB_URI
  );
};

module.exports = {
  connectToDB
};
