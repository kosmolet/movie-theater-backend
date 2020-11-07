const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.param('movieId', async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({ message: 'Movie with this ID does not exist' });
    } else {
      req.user = user;
      req.userId = req.params.userId;
      next();
    }
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
