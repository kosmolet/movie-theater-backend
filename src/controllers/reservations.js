const express = require('express');
const Reservation = require('../models/reservation');

const router = express.Router();

router.get('/', async (req, res) => {
  const allReservations = await Reservation.find();
  return res.json(allReservations);
});

router.get('/:reservationId', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    return !reservation
      ? res.status(404).json({ message: 'Reservation ID does not exist' })
      : res.send(reservation);
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
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      {
        $set: req.body,
      }
    );
    return !reservation
      ? res.status(404).json({ message: 'Reservation ID does not exist' })
      : res.send(reservation);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete('/:reservationId', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.reservationId
    );
    return !reservation
      ? res.status(404).json({ message: 'Reservation ID does not exist' })
      : res.send(reservation);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
