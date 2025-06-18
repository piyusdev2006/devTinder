const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_SECRET_KEY",
});



module.exports = instance;