
// here we import mongoose
const mongoose = require("mongoose");

const connectToDB = async () => {
  // console.log(process.env.MONGODB_URL);
  await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectToDB;
