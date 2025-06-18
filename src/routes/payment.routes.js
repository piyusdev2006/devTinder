const express = require('express');
const { userAuth } = require('../middlewares/auth.middlewares');
const paymentRouter = express.Router();
const razorpayInstance = require('../utils/razorpay'); 
const Payment = require('../models/payment');
const User = require('../models/user');
const { membershipAmount } = require('../utils/constants');
const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils");
const payment = require('../models/payment');

//payment API for creating an Order
paymentRouter.post("/payment/create", userAuth , async (req, res) => {
    try {
      
        const { membershipType } = req.body;
        const { firstName, lastName, email } = req.user;

        const order = await razorpayInstance.orders.create({
          amount: membershipAmount[membershipType]*100,
           // means 50000 paise or 500 INR
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            firstName,
            lastName,
            email,
            membershipType: membershipType,
          },
        });

        //   after the payment is successful, save the order ID in Db
        console.log("Order created:", order);

        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes,
        });
        const savedPayment = await payment.save();


      //   return back my order details to the frontend
      res.json({...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID});
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ error: "Failed to create order" });
    }
});

// razorpay call this api
paymentRouter.post("/premium/verify", async (req, res) => {
    const webhookSignature = req.get("X-Razorpay-Signature");
    try {
        const isWebhookValid = validateWebhookSignature(
          JSON.stringify(req.body),
          webhookSignature,
          process.env.RAZORPAY_WEBHOOK_SECRET
        );

        if (!isWebhookValid) {
            return res.status(400).json({ error: "Invalid webhook signature" });
        }

        // if my webhook is valid , update the payment status in DB
        const paymentDetails = req.body.payload.payment.entity;
        const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
        payment.status = paymentDetails.status;
        await payment.save();
        
        // Also update the user MembershipType{premium or premium-plus}
        const user = await User.findOne({ _id: payment.userId });
        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;
        await user.save()

        // whenever a webhook is called ,in the req.body they provide access to an "event" object , i can verify my payment using this object

        // if (req.body.event == "payment.captured") {}
        // if (req.body.event == "payment.failed") {}
        
        // return success response to razorpay 
        res.status(200).json({
            message: "webhook received successfully"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
    const user = req.user;
    if(user.isPremium){
        return res.json({ isPremium: true });
    }
    return res.json({ isPremium: false });
});

module.exports = paymentRouter;

