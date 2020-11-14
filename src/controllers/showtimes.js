const express = require('express');
const ShowTime = require('../models/showtime');
const Movie = require('../models/movie');

const router = express.Router();

router.get('/:showtimeId', async (req, res) => {
  const found = await ShowTime.find({ _id: req.params.showtimeId });
  res.json(found);
});

router.get('/', async (req, res) => {
  const allShowtimes = await ShowTime.find();
  res.json(allShowtimes);
});

router.post('/', async (req, res) => {
  try {
    const showtime = new ShowTime(req.body);
    await showtime.save();
    const movie = await Movie.findById({ _id: showtime.movie });
    if (!movie) {
      res
        .status(404)
        .json({ message: 'movie: should contain ID of existing movie' });
    }
    movie.showtimes.push(showtime);
    await movie.save();
    res.status(200).json({ success: true, data: showtime });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:showtimeId', async (req, res) => {
  try {
    const showtime = await ShowTime.findByIdAndUpdate(req.params.showtimeId, {
      $set: req.body,
    });
    return !showtime
      ? res.status(404).json({ message: 'ShowtimeID does not exist' })
      : res.send(showtime);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:showtimeId', async (req, res) => {
  try {
    const showtime = await ShowTime.findByIdAndDelete(req.params.showtimeId);
    return !showtime
      ? res.status(404).json({ message: 'ShowtimeID does not exist' })
      : res.send(showtime);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:showtimeId/reservations', async (req, res) => {
  const foundShowtime = await ShowTime.find({
    _id: req.params.showtimeId,
  }).populate('reservations');
  return res.json(foundShowtime);
});

module.exports = router;
