require("dotenv").config();

// here we import mongoose
const mongoose = require("mongoose");

// to connect to  cluster NamasteNoodejs ,simplr query is :

const MONGODB_URI = process.env.MONGODB_URL;



const connectToDB = async () => {
  await mongoose.connect('mongodb+srv://NamasteNode:ShOhQNzmIQq3z5JG@akshaysaininode.ycri0.mongodb.net/devTinder?retryWrites=true&w=majority');
};

module.exports = {
  connectToDB
};
