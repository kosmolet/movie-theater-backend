const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
  const allMovies = await Movie.find();
  return res.json(allMovies);
});

router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    return !movie
      ? res.status(404).json({ message: 'Movie with this ID does not exist' })
      : res.send(movie);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, {
      $set: req.body,
    });
    return !movie
      ? res.status(404).json({ message: 'Movie with this ID does not exist' })
      : res.send(movie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId);
    return !movie
      ? res.status(404).json({ message: 'Movie with this ID does not exist' })
      : res.send(movie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;