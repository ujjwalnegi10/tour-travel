const Stripe = require('stripe');
const stripe = Stripe('your_stripe_secret_key'); // Replace with your Stripe secret key
const Cart = require('../models/Cart');
const Hotel = require('../models/Hotel');
const Destination = require('../models/Destination');

// Checkout and process payment
exports.checkout = async (req, res) => {
  try {
    // Fetch the cart items for the user
    const cartItems = await Cart.find({ user: req.user._id }).populate('itemId');
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    // Calculate the total amount for the cart
    let totalAmount = 0;
    cartItems.forEach(item => {
      if (item.itemType === 'hotel') {
        totalAmount += item.quantity * item.itemId.price;
      } else if (item.itemType === 'destination') {
        totalAmount += item.quantity * item.itemId.price;
      }
    });

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert to cents
      currency: 'usd', // You can change to your required currency
      metadata: { integration_check: 'accept_a_payment' },
    });

    // Send back the client secret for frontend payment processing
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: error.message });
  }
};

// Handle Stripe webhook events for payment success and failure
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'your_webhook_signing_secret'; // Set this in your Stripe dashboard
  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event based on the event type
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      
      // Here you can update your database with successful payment info, for example:
      // await Order.create({ userId: req.user._id, items: cartItems, totalAmount: totalAmount });

      res.status(200).json({ message: 'Payment Successful' });
      break;

    case 'payment_intent.payment_failed':
      const paymentFailedIntent = event.data.object;
      console.log('PaymentIntent failed:', paymentFailedIntent);

      res.status(200).json({ message: 'Payment Failed' });
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
      res.status(400).json({ message: 'Unhandled event type' });
      break;
  }

  // Acknowledge receipt of the event
  res.json({ received: true });
};
