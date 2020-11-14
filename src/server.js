const express = require('express');
const cors = require('cors');
const pino = require('pino');
const expressLogger = require('express-pino-logger');

const app = express();

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
global.logger = logger;

if (['development', 'production'].includes(process.env.NODE_ENV)) {
  app.use(expressLogger({ logger }));
}

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const reservations = require('./controllers/reservations');
const movies = require('./controllers/movies');
const showtimes = require('./controllers/showtimes');

app.get('/', (req, res) => {
  logger.debug('working');
  res.json({
    message: 'it works',
  });
});

app.use('/api/v1/movies', movies);
app.use('/api/v1/movies/:movieId/showtimes', showtimes);
app.use(
  '/api/v1/movies/:movieId/showtimes/:showtimeId/reservations',
  reservations
);

module.exports = app;
