const express = require('express');
const Reservation = require('../models/reservation');
const ShowTime = require('../models/showtime');

const router = express.Router();

router.get('/:reservationId', async (req, res) => {
  const found = await Reservation.find({ _id: req.params.reservationId });
  res.json(found);
});

router.get('/', async (req, res) => {
  const allReservations = await Reservation.find();
  res.json(allReservations);
});

router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    const showtime = await ShowTime.findById({ _id: reservation.showtime });
    showtime.reservations.push(reservation);
    await showtime.save();
    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
      : res.status(204).send(reservation);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
