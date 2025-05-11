const express = require('express');
const { checkout, stripeWebhook } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware'); // Assuming you want to protect the route
const router = express.Router();

// Route for initiating checkout process
router.post('/checkout', protect, checkout);

// Stripe webhook to handle payment success/failure notifications
router.post('/webhook', stripeWebhook);

module.exports = router;
