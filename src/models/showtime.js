const mongoose = require('mongoose');

const { Schema } = mongoose;
const showtimeSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  cinemaRoomId: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaRoom',
    required: true,
  },
});

const ShowTime = mongoose.model('Showtime', showtimeSchema);

module.exports = ShowTime;
