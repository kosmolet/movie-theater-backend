const express = require('express');
const Reservation = require('../models/reservation');

const router = express.Router();

router.get('/', async (req, res) => {
  const allReservations = await Reservation.find();
  return res.json(allReservations);
});

router.get('/:reservationId', async (req, res) => {
  try {
    return res.json(req.reservation);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    await reservation.save();
    res.status(201).send(reservation);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/:reservationId', async (req, res) => {
  try {
    const reservation = { _id: req.reservationId, ...req.body };
    await Reservation.findByIdAndUpdate(req.params.reservationId, { $set: req.body });
    return res.send(reservation);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:reservationId', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.reservationId);
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.param('reservationId', async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      res
        .status(404)
        .json({ message: 'Reservation with this ID does not exist' });
    } else {
      req.reservation = reservation;
      req.reservationId = req.params.reservationId;
      next();
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
