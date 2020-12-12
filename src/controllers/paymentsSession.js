const express = require('express');
const Stripe = require('stripe');

const ticketPrice = process.env.PRICE;

const paymentSessionRouter = express.Router();

const { STRIPE_SK, DOMAIN } = process.env;
const stripe = new Stripe(STRIPE_SK);

paymentSessionRouter.post('/', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: req.body.email,
      line_items: [
        {
          price_data: {
            currency: 'sek',
            product_data: {
              name: req.body.name,
              images: [req.body.images],
            },
            unit_amount: ticketPrice,
          },
          quantity: req.body.quantity,
        },
      ],
      mode: 'payment',
      metadata: {
        reservationId: req.body.reservationId,
        movieId: req.body.movieId,
        showtimeId: req.body.showtimeId,
      },
      locale: req.body.locale,
      success_url: `${DOMAIN}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}failure?session_id={CHECKOUT_SESSION_ID}`,
    });
    return res.json({ id: session.id });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

paymentSessionRouter.get('/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId,
      {
        expand: ['line_items'],
      }
    );
    return res.send(session);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

paymentSessionRouter.get('/customers/:customerId', async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.customerId);
    return res.send(customer);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = paymentSessionRouter;
