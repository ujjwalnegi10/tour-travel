const stripe = require('../config/paymentConfig');

const verifyStripeWebhook = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  try {
    req.event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    next();
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = verifyStripeWebhook;
