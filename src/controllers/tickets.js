const express = require('express');
const User = require('../models/user');

const router = express.Router({ mergeParams: true });

router.param('ticketId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user.length < 1) {
      res.status(404).json({ message: 'User ID does not exist' });
    }

    const ticket = user.tickets.find(
      (aTicket) => aTicket._id.toString() === req.params.ticketId
    );
    if (!ticket) {
      res.status(404).json({ message: 'Ticket ID does not exist' });
    } else {
      req.user = user;
      req.userId = req.params.userId;
      req.existingTicket = ticket;
      req.ticketId = req.params.ticketId;
      next();
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
