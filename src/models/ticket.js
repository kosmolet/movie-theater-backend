const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: { type: String },
  isPaymentSucceeded: { type: Number, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  seat: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = {
  Ticket: mongoose.model('Ticket', TicketSchema),
  TicketSchema,
};
