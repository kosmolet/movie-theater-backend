const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');
const Movie = require('../../models/movie');

describe('Showtime test suite ', () => {
  let expectedMovie;
  let movieId;
  let showtimeId;
  const showtimeNotExist = '5fb9e080dbbcf7683c5a5233';

  const showtimeExpected = {
    startAt: '2020-12-07T12:30:00.000Z',
    endAt: '2020-12-07T14:30:00.000Z',
    hallName: 'Stockholm Cinema Hall TEST',
    unavailableSeats: [3, 7, 22],
    city: 'Stockholm',
    movie: movieId,
  };

  before(async () => {
    connect();
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
    showtimeExpected.movie = movieId;
  });

  after(async () => {
    await Movie.deleteMany();
    mongoose.connection.close();
  });

  describe('POST /api/v1/movies/:movieId/showtimes', () => {
    it('showtime should be created for movie', async () => {
      const response = await supertest(app)
        .post(`/api/v1/movies/${movieId}/showtimes`)
        .send({
          startAt: '2020-12-07T12:30:00.000Z',
          endAt: '2020-12-07T14:30:00.000Z',
          hallName: 'Stockholm Cinema Hall TEST',
          unavailableSeats: [3, 7, 22],
          city: 'Stockholm',
          movie: movieId,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const actualShowtime = response.body.data;

      expect(actualShowtime.startAt).to.equal(showtimeExpected.startAt);
      expect(actualShowtime.endAt).to.equal(showtimeExpected.endAt);
      expect(actualShowtime.hallName).to.equal(showtimeExpected.hallName);
      expect(actualShowtime.unavailableSeats.toString).to.equal(
        actualShowtime.unavailableSeats.toString
      );
      expect(actualShowtime.city).to.equal(showtimeExpected.city);
      expect(actualShowtime.movie).to.equal(movieId);
    });
  });

  describe('GET /api/v1/movies/:movieId/showtimes', () => {
    it('showtimes for movie should be returned', async () => {
      const response = await supertest(app)
        .get(`/api/v1/movies/${movieId}/showtimes`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const actualShowtime = response.body[0].showtimes[0];
      showtimeId = actualShowtime._id;
      expect(actualShowtime.startAt).to.equal(showtimeExpected.startAt);
      expect(actualShowtime.endAt).to.equal(showtimeExpected.endAt);
      expect(actualShowtime.hallName).to.equal(showtimeExpected.hallName);
      expect(actualShowtime.unavailableSeats.toString).to.equal(
        showtimeExpected.unavailableSeats.toString
      );
      expect(actualShowtime.city).to.equal(showtimeExpected.city);
      expect(actualShowtime.movie).to.equal(movieId);
    });
  });

  describe('GET /api/v1/movies/:movieId/showtimes/:showtimeID', () => {
    it('GET_byID should return showtime for movie', async () => {
      const response = await supertest(app)
        .get(`/api/v1/movies/${movieId}/showtimes/${showtimeId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const actualShowtime = response.body[0];
      expect(actualShowtime.startAt).to.equal(showtimeExpected.startAt);
      expect(actualShowtime.endAt).to.equal(showtimeExpected.endAt);
      expect(actualShowtime.hallName).to.equal(showtimeExpected.hallName);
      expect(actualShowtime.unavailableSeats.toString).to.equal(
        showtimeExpected.unavailableSeats.toString
      );
      expect(actualShowtime.city).to.equal(showtimeExpected.city);
      expect(actualShowtime.movie).to.equal(movieId);
    });
  });

  describe('PATCH /api/v1/movies/:movieId/showtimes/:showtimeID', () => {
    const hallNameExpected = 'Stockholm Cinema Hall Patched';
    it('should update a particular showtime of a movie', async () => {
      await supertest(app)
        .patch(`/api/v1/movies/${movieId}/showtimes/${showtimeId}`)
        .send({
          hallName: hallNameExpected,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const updated = await supertest(app).get(
        `/api/v1/movies/${movieId}/showtimes/${showtimeId}`
      );
      const actualShowtime = updated.body[0];
      expect(actualShowtime._id).to.equal(showtimeId);
      expect(actualShowtime.hallName).to.equal(hallNameExpected);
    });

    it('should return ShowtimeID does not exisT if no match found for update', async () => {
      await supertest(app)
        .patch(`/api/v1/movies/${movieId}/showtimes/${showtimeNotExist}`)
        .send({
          hallName: hallNameExpected,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { message: 'ShowtimeID does not exist' });
    });
  });
  describe('DELETE /api/v1/movies/:movieId/showtimes/:showtimeID', () => {
    it('should delete a particular showtime of a movie', async () => {
      await supertest(app)
        .delete(`/api/v1/movies/${movieId}/showtimes/${showtimeId}`)
        .set('Accept', 'application/json')
        .expect(204);
    });

    it('should return ShowtimeID does not exisT if no match found for for delete', async () => {
      await supertest(app)
        .delete(`/api/v1/movies/${movieId}/showtimes/${showtimeNotExist}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, { message: 'ShowtimeID does not exist' });
    });
  });
});
