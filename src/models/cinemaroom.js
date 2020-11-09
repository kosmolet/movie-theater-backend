const mongoose = require('mongoose');

const { Schema } = mongoose;

const CinemaRoomSchema = new Schema({
  name: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  city: { type: String, required: true },
  seats: { type: [Number], required: true },
  takenSeats: { type: [Number], required: true },
});

const CinemaRoom = mongoose.model('CinemaRoom', CinemaRoomSchema);

module.exports = CinemaRoom;
