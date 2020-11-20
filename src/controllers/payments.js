const express = require('express');
const Stripe = require('stripe');

const paymentRouter = express.Router();

const stripeSecret = process.env.STRIPE_SK;
const stripe = new Stripe(stripeSecret);

const calculateOrderAmount = (items) => items * 2000;

paymentRouter.post('/', async (req, res) => {
  const { email, items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    receipt_email: email,
    amount: calculateOrderAmount(items),
    currency: 'sek',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res.json({ client_secret: paymentIntent.client_secret });
});
module.exports = paymentRouter;
