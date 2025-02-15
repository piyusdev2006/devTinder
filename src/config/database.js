
// here we import mongoose 
const mongoose = require("mongoose");

// to connect to  cluster NamasteNoodejs ,simplr query is :

const connectToDB = async () => {
   await mongoose.connect(
      "mongodb+srv://NamasteNode:namaste123@akshaysaininode.ycri0.mongodb.net/devTinder"
    ); 
} 

module.exports = { connectToDB };



