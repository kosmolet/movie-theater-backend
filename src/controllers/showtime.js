const express = require('express');
const ShowTime = require('../models/showtime');

const router = express.Router();
router.get('/', async (req, res) => {
  const allShowTimes = await ShowTime.find();
  return res.json(allShowTimes);
});

router.get('/:showtimeId', async (req, res) => {
  try {
    return res.json(req.showtime);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const showtime = new ShowTime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/:showtimeId', async (req, res) => {
  try {
    const showtime = await ShowTime.findByIdAndDelete(req.params.showtimeId);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.param('showtimeId', async (req, res, next) => {
  try {
    const showtime = await ShowTime.findById(req.params.showtimeId);
    if (!showtime) {
      res.status(404).json({ message: 'ShowTime with this ID does not exist' });
    } else {
      req.showtime = showtime;
      req.showtimeId = req.params.showtimeId;
      next();
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});
module.exports = router;
