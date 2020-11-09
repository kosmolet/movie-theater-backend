const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  title: { type: String, required: true },
  seats: { type: [Number], required: true },
  ticketPrice: { type: Number, required: true },
  showtimeId: {
    type: Schema.Types.ObjectId,
    ref: 'ShowTime',
    required: true,
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  isPaymentSucceed: { type: Boolean, default: false, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
