const mongoose = require('mongoose');

const { Schema } = mongoose;
const ReservationSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    isPaymentSucceed: { type: Boolean, default: false, required: true },
    seats: { type: [Number], required: true },
    totalPrice: { type: Number, required: true },
    showtime: {
      type: Schema.Types.ObjectId,
      ref: 'ShowTime',
      required: true,
    },
    stripeCustomerId: { type: String },
    stripeAmountCharged: { type: Number },
    stripeCheckoutSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    stripePaymentCreateAt: { type: Date },
  },
  { timestamps: true }
);

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;
