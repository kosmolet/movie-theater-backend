const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: { type: Date, required: true },
  startAt: { type: String, required: true },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: { type: Number, required: true },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaRoom',
    required: true,
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  isPaymentSucceed: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
