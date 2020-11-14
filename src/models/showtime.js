const mongoose = require('mongoose');

const { Schema } = mongoose;
const ShowTimeSchema = new Schema(
  {
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    hallName: { type: String, required: true },
    takenSeats: { type: [Number], required: true },
    city: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
      },
    ],
  },
  { timestamps: true }
);

const ShowTime = mongoose.model('ShowTime', ShowTimeSchema);
module.exports = ShowTime;
