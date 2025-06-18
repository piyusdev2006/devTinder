const express = require('express');
const { userAuth } = require('../middlewares/auth.middlewares');
const paymentRouter = express.Router();

//payment API for creating an Order
paymentRouter.post('/create-order', userAuth , async (req, res) => {
    
});

module.exports = paymentRouter;

