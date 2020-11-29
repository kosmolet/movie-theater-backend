const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');
const Showtime = require('../../models/showtime');
const Movie = require('../../models/movie');

describe('Testing Showtime Endpoints ', () => {
  let expectedMovie;
  let movieId;
  let shId;

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
  });

  after(async () => {
    await Movie.deleteMany();
    mongoose.connection.close();
  });

  describe('POST /api/v1/movies/:movieId/showtimes', () => {
    const showtime = {
      startAt: '2020-12-07T12:30:00.000Z',
      endAt: '2020-12-07T14:30:00.000Z',
      hallName: 'Stockholm Cinema Hall TEST',
      unavailableSeats: [3, 7, 22],
      city: 'Stockholm',
      movie: movieId,
    };
    it('should create showtime', async () => {
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
      const actualData = response.body.data;

      expect(actualData.startAt).to.equal(showtime.startAt);
      expect(actualData.endAt).to.equal(showtime.endAt);
      expect(actualData.hallName).to.equal(showtime.hallName);
      expect(actualData.unavailableSeats.toString).to.equal(
        showtime.unavailableSeats.toString
      );
      expect(actualData.city).to.equal(showtime.city);
      expect(actualData.movie).to.equal(movieId);
    });

    //   describe('GET /api/v1/showtime/:showtimeId', () => {
    //     it('should return a showtime by id', async () => {
    //       const expectedShowTime = new Showtime({
    //         startDate: '2020-12-01',
    //         startAt: '12:30',
    //         endAt: '2020-12-01',
    //         movieId: '5fa6f46899169350dc3744a5',
    //         cinemaRoomId: '5fa880c6dded804a54cadb75',
    //       });
    //       await expectedShowTime.save();

    //       const id = expectedShowTime._id.toString();

    //       const response = await supertest(app)
    //         .get(`/api/v1/showtime/${id}`)
    //         .expect(200);

    //       expect(response.body._id).to.equal(id);
    //     });

    //     it('should return "Not found" if no ids are matching', async () => {
    //       const id = '5f71df69851eeaa23f6bbd5f';

    //       await supertest(app)
    //         .get(`/api/v1/showtime/${id}`)
    //         .expect(404, { message: 'Showtime ID does not exist' });
    //     });
    //   });

    //   describe('POST /api/v1/showtime', () => {
    //     it('should save ShowTime to the database', async () => {
    //       const response = await supertest(app)
    //         .post('/api/v1/showtime')
    //         .send({
    //           startDate: '2020-12-01',
    //           startAt: '12:30',
    //           endAt: '2020-12-01',
    //           movieId: '5fa6f46899169350dc3744a5',
    //           cinemaRoomId: '5fa880c6dded804a54cadb75',
    //         })
    //         .expect(201);

    //       const foundShowTime = await Showtime.findOne({ _id: response.body._id });
    //       const foundShowTimeId = foundShowTime._id.toString();

    //       expect(response.body._id).to.equal(foundShowTimeId);
    //       expect(response.body.startDate).to.equal('2020-12-01T00:00:00.000Z');
    //       expect(response.body.startAt).to.equal(foundShowTime.startAt);
    //       expect(response.body.endAt).to.equal('2020-12-01T00:00:00.000Z');
    //       expect(response.body.movieId).to.equal('5fa6f46899169350dc3744a5');
    //       expect(response.body.cinemaRoomId).to.equal('5fa880c6dded804a54cadb75');
    //     });
    //   });

    //   describe('DELETE /api/v1/showtime/:showtimeId', () => {
    //     it('should delete a ShowTime', async () => {
    //       const expectedShowTime = new Showtime({
    //         startDate: '2020-12-01',
    //         startAt: '12:30',
    //         endAt: '2020-12-01',
    //         movieId: '5fa6f46899169350dc3744a5',
    //         cinemaRoomId: '5fa880c6dded804a54cadb75',
    //       });
    //       await expectedShowTime.save();

    //       await supertest(app)
    //         .delete(`/api/v1/showtime/${expectedShowTime._id}`)
    //         .expect(200);

    //       const deletedShowTime = await Showtime.findOne({
    //         _id: expectedShowTime._id,
    //       });

    //       // eslint-disable-next-line no-unused-expressions
    //       expect(deletedShowTime).to.be.null;
    //     });
  });
});
