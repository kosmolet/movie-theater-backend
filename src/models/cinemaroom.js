const mongoose = require('mongoose');

const { Schema } = mongoose;

const rowSchema = new Schema({
  row: { type: String, required: true },
  seat: { type: Number, required: true },
  isTaken: { type: Boolean, required: true },
});

const cinemaRoomSchema = new Schema({
  name: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  city: { type: String, required: true },
  rows: [[rowSchema]],
});

const CinemaRoom = mongoose.model('CinemaRoom', cinemaRoomSchema);

module.exports = CinemaRoom;
