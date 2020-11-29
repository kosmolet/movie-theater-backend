const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');
const Movie = require('../../models/movie');
const ShowTime = require('../../models/showtime');

describe('Reservation test suite ', () => {
  let expectedMovie;
  let expectedShowTime;
  let movieId;
  let showtimeId;
  let reservationId;
  const reservationIDNotExist = '5fb9e080dbbcf7683c5a5233';

  const reservationExpected = {
    isPaymentSucceed: true,
    seats: [13, 12],
    isEmailSend: false,
    username: 'test name',
    email: 'mail123@gmail.com',
    totalPrice: 250,
    showtime: showtimeId,
  };

  before(async () => {
    await connect();
    expectedMovie = new Movie({
      title: 'Spell movieTEST',
      overview: 'overview',
      popularity: 117,
      poster_path: '/4rjHhj1BAREc9zNFU8FheLJQdFf.jpg',
      backdrop_path: '/5gllGAa3c9UqeRI8r6GXiQJIEtp.jpg',
      runtime: 91,
      genres: ['Thriller ', 'Horror'],
      release_date: '2020-10-30',
      tmdb_id: 621151,
      status: 'Released',
    });
    await expectedMovie.save();
    movieId = expectedMovie._id.toString();

    expectedShowTime = new ShowTime({
      startAt: '2020-12-07T12:30:00.000Z',
      endAt: '2020-12-07T14:30:00.000Z',
      hallName: 'Stockholm Cinema Hall TEST',
      unavailableSeats: [3, 7, 22],
      city: 'Stockholm',
      movie: movieId,
    });
    await expectedShowTime.save();
    showtimeId = expectedShowTime._id.toString();
    reservationExpected.showtime = showtimeId;
  });

  after(async () => {
    await Movie.deleteMany();
    mongoose.connection.close();
  });

  describe('POST /api/v1/movies/:movieId/showtimes/:showtimeId/reservations', () => {
    it('reservation should be created for showtime/movie', async () => {
      const response = await supertest(app)
        .post(`/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations`)
        .send({
          isPaymentSucceed: true,
          seats: [13, 12],
          isEmailSend: false,
          username: 'test name',
          email: 'mail123@gmail.com',
          totalPrice: 250,
          showtime: showtimeId,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const actualReservation = response.body.data;
      expect(actualReservation.username).to.equal(reservationExpected.username);
      expect(actualReservation.email).to.equal(reservationExpected.email);
      expect(actualReservation.isPaymentSucceed).to.equal(
        reservationExpected.isPaymentSucceed
      );
      expect(actualReservation.isEmailSend).to.equal(
        reservationExpected.isEmailSend
      );
      expect(actualReservation.seats.toString).to.equal(
        reservationExpected.seats.toString
      );
      expect(actualReservation.showtime).to.equal(showtimeId);
    });
  });

  describe('GET /api/v1/movies/:movieId/showtimes/:showtimeId/reservations', () => {
    it('reservations for movie/showtime should be returned', async () => {
      const response = await supertest(app)
        .get(`/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const actualReservation = response.body[0].reservations[0];
      reservationId = actualReservation._id;

      expect(actualReservation.username).to.equal(reservationExpected.username);
      expect(actualReservation.email).to.equal(reservationExpected.email);
      expect(actualReservation.isPaymentSucceed).to.equal(
        reservationExpected.isPaymentSucceed
      );
      expect(actualReservation.isEmailSend).to.equal(
        reservationExpected.isEmailSend
      );
      expect(actualReservation.seats.toString).to.equal(
        reservationExpected.seats.toString
      );
      expect(actualReservation.showtime).to.equal(showtimeId);
    });
  });

  describe('GET /api/v1/movies/:movieId/showtimes/:showtimeId/reservations/:reservationsId', () => {
    it('should return reservation for showtime', async () => {
      const response = await supertest(app)
        .get(
          `/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations/${reservationId}`
        )
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const actualReservation = response.body[0];
      expect(actualReservation.username).to.equal(reservationExpected.username);
      expect(actualReservation.email).to.equal(reservationExpected.email);
      expect(actualReservation.isPaymentSucceed).to.equal(
        reservationExpected.isPaymentSucceed
      );
      expect(actualReservation.isEmailSend).to.equal(
        reservationExpected.isEmailSend
      );
      expect(actualReservation.seats.toString).to.equal(
        reservationExpected.seats.toString
      );
      expect(actualReservation.showtime).to.equal(showtimeId);
    });
  });

  describe('PATCH /api/v1/movies/:movieId/showtimes/:showtimeId/reservations/:reservationsId', () => {
    const isEmailSendExpected = true;
    it('should update a particular reservation of a showtime', async () => {
      await supertest(app)
        .patch(
          `/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations/${reservationId}`
        )
        .send({
          isEmailSend: isEmailSendExpected,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const updated = await supertest(app).get(
        `/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations/${reservationId}`
      );
      const actualReservation = updated.body[0];
      expect(actualReservation._id).to.equal(reservationId);
      expect(actualReservation.isEmailSend).to.equal(isEmailSendExpected);
    });

    it('should return ReservationID does not exisT if no match found for update', async () => {
      await supertest(app)
        .patch(
          `/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations/${reservationIDNotExist}`
        )
        .send({
          isEmailSend: true,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { message: 'Reservation ID does not exist' });
    });
  });
  describe('DELETE /api/v1/movies/:movieId/showtimes/:showtimeId/reservations/:reservationsId', () => {
    it('should delete a particular reservation', async () => {
      await supertest(app)
        .delete(
          `/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations/${reservationId}`
        )
        .set('Accept', 'application/json')
        .expect(204);
    });

    it('should return ReservationID does not exisT if no match found for for delete', async () => {
      await supertest(app)
        .delete(
          `/api/v1/movies/${movieId}/showtimes/${showtimeId}/reservations/${reservationIDNotExist}`
        )
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { message: 'Reservation ID does not exist' });
    });
  });
});
