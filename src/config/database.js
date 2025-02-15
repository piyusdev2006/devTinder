
// here we import mongoose 
const mongoose = require("mongoose");

// to connect to  cluster NamasteNoodejs ,simplr query is :
const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
const connectToDB = async () => {
   await mongoose.connect(MONGODB_URI); 
} 

module.exports = { connectToDB };



