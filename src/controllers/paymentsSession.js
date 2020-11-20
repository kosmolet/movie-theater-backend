// /* eslint-disable default-case */
// const express = require('express');
// const Stripe = require('stripe');
// const bodyParser = require('body-parser');

// const paymentRouter = express.Router();

// const stripeSecret = process.env.STRIPE_SK;
// const stripe = new Stripe(stripeSecret);

// // paymentRouter.post('/', async (req, res) => {
// //   try {
// //     const { status } = await stripe.charges.create({
// //       amount: req.body.amount,
// //       currency: 'usd',
// //       source: req.body.token,
// //     });
// //     return res.json({ status });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).end();
// //   }
// // });

// const YOUR_DOMAIN = 'http://localhost:3001/checkout';
// paymentRouter.post('/', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Stubborn Attachments',
//             images: ['https://i.imgur.com/EHyR2nP.png'],
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.json({ id: session.id });
// });

// const fulfillOrder = (session) => {
//   // TODO: fill me in
//   console.log('Fulfilling order', session);
// };

// const createOrder = (session) => {
//   // TODO: fill me in
//   console.log('Creating order', session);
// };

// const emailCustomerAboutFailedPayment = (session) => {
//   // TODO: fill me in
//   console.log('Emailing customer', session);
// };

// paymentRouter.post(
//   '/webhook',
//   bodyParser.raw({ type: 'application/json' }),
//   (request, response) => {
//     const payload = request.body;
//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (err) {
//       return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object;

//       // Fulfill the purchase...
//       fulfillOrder(session);
//     }
//     switch (event.type) {
//       case 'checkout.session.completed': {
//         const session = event.data.object;
//         // Save an order in your database, marked as 'awaiting payment'
//         createOrder(session);

//         // Check if the order is paid (e.g., from a card payment)
//         //
//         // A delayed notification payment will have an `unpaid` status, as
//         // you're still waiting for funds to be transferred from the customer's
//         // account.
//         if (session.payment_status === 'paid') {
//           fulfillOrder(session);
//         }

//         break;
//       }

//       case 'checkout.session.async_payment_succeeded': {
//         const session = event.data.object;

//         // Fulfill the purchase...
//         fulfillOrder(session);

//         break;
//       }

//       case 'checkout.session.async_payment_failed': {
//         const session = event.data.object;

//         // Send an email to the customer asking them to retry their order
//         emailCustomerAboutFailedPayment(session);

//         break;
//       }
//     }

//     response.status(200);
//   }
// );

// module.exports = paymentRouter;
