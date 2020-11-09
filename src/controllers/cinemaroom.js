const express = require('express');
const CinemaRoom = require('../models/cinemaroom');

const router = express.Router();

router.get('/', async (req, res) => {
  const allCinemarooms = await CinemaRoom.find();
  return res.json(allCinemarooms);
});

router.get('/:roomId', async (req, res) => {
  try {
    return res.json(req.room);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const room = new CinemaRoom(req.body);
  try {
    await room.save();
    res.status(201).send(room);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/:roomId', async (req, res) => {
  try {
    const room = await CinemaRoom.findByIdAndDelete(req.params.roomId);
    return !room ? res.sendStatus(404) : res.send(room);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.param('roomId', async (req, res, next) => {
  try {
    const room = await CinemaRoom.findById(req.params.roomId);
    if (!room) {
      res.status(404).json({ message: 'Room with this ID does not exist' });
    } else {
      req.room = room;
      req.roomId = req.params.roomId;
      next();
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
