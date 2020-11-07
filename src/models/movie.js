const mongoose = require('mongoose');

const { Schema } = mongoose;
const movieSchema = new Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: String, required: true },
  poster_path: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  runtime: { type: Number, required: true },
  genre: { type: [String], required: true },
  release_date: { type: Date, required: true },
  tmdb_id: { type: Number, required: true },
  status: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
