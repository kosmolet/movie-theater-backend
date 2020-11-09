const supertest = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../../server');
const { connect } = require('../../config/database');
const Movie = require('../../models/movie');

describe('GET /', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .get('/')
      .expect(200, {
        message: 'it works',
      })
      .end((err) => {
        if (err) done(err);
        done();
      });
  });
});

describe('Testing Movies Endpoints ', () => {
  beforeEach(() => {
    connect();
  });

  afterEach(async () => {
    await Movie.deleteMany();
    mongoose.connection.close();
  });

  describe('GET /api/v1/movies', () => {
    it('should return all movies', async () => {
      const expectedMovie = new Movie({
        title: 'TEST Movie',
        overview:
          "After leaving their cave, the Croods encounter their biggest threat since leaving: another family called the Bettermans, who claim to be better and evolved. But after Eep and the Bettermans' only daughter escape, the two families must put aside their differences to save them.",
        popularity: 151,
        poster_path:
          'https://image.tmdb.org/t/p/w342/8u1JT7w94Mi20pH3UYv2gUnyXSY.jpg',
        backdrop_path:
          'https://image.tmdb.org/t/p/original/mqmHhAf7OhJq5Tq81p7wFI0Fnde.jpg',
        runtime: 90,
        genre: ["Adventure","Family","Fantasy"],
        release_date: '2020-11-25',
        tmdb_id: 529203,
        status: 'Released',
      });
      await expectedMovie.save();

      const response = await supertest(app).get('/api/v1/movies').expect(200);

      expect(response.body[0].title).to.equal(expectedMovie.title);
      expect(response.body[0].overview).to.equal(expectedMovie.overview);
      expect(response.body[0].popularity).to.equal(expectedMovie.popularity);
      expect(response.body[0].poster_path).to.equal(expectedMovie.poster_path);
      expect(response.body[0].backdrop_path).to.equal(
        expectedMovie.backdrop_path
      );
      expect(response.body[0].runtime).to.equal(expectedMovie.runtime);
      expect(response.body[0].genre).to.have.same.members(expectedMovie.genre);
      expect(response.body[0].tmdb_id).to.equal(expectedMovie.tmdb_id);
      expect(response.body[0].status).to.equal(expectedMovie.status);
    });
  });

  describe('GET /api/v1/movies/:movieId', () => {
    it('should return a movie by id', async () => {
      const expectedMovie = new Movie({
        title: 'TEST Movie',
        overview:
          "After leaving their cave, the Croods encounter their biggest threat since leaving: another family called the Bettermans, who claim to be better and evolved. But after Eep and the Bettermans' only daughter escape, the two families must put aside their differences to save them.",
        popularity: 151,
        poster_path:
          'https://image.tmdb.org/t/p/w342/8u1JT7w94Mi20pH3UYv2gUnyXSY.jpg',
        backdrop_path:
          'https://image.tmdb.org/t/p/original/mqmHhAf7OhJq5Tq81p7wFI0Fnde.jpg',
        runtime: 90,
        genre: ['Adventure', 'Family', 'Fantasy'],
        release_date: '2020-11-25',
        tmdb_id: 529203,
        status: 'Released',
      });
      await expectedMovie.save();

      const id = expectedMovie._id.toString();

      const response = await supertest(app)
        .get(`/api/v1/movies/${id}`)
        .expect(200);

      expect(response.body._id).to.equal(id);
    });

    it('should return "No movies found" if there are no movies', async () => {
      const id = '5f71df69851eeaa23f6bbd5f';

      await supertest(app)
        .get(`/api/v1/movies/${id}`)
        .expect(404, { message: 'Movie with this ID does not exist' });
    });
  });

  describe('POST /api/v1/movies', () => {
    it('should save movie to the database', async () => {
      const response = await supertest(app)
        .post('/api/v1/movies')
        .send({
          title: 'TEST Movie',
          overview:
            "After leaving their cave, the Croods encounter their biggest threat since leaving: another family called the Bettermans, who claim to be better and evolved. But after Eep and the Bettermans' only daughter escape, the two families must put aside their differences to save them.",
          popularity: 151,
          poster_path:
            'https://image.tmdb.org/t/p/w342/8u1JT7w94Mi20pH3UYv2gUnyXSY.jpg',
          backdrop_path:
            'https://image.tmdb.org/t/p/original/mqmHhAf7OhJq5Tq81p7wFI0Fnde.jpg',
          runtime: 90,
          genre: ['Adventure', 'Family', 'Fantasy'],
          release_date: '2020-11-25',
          tmdb_id: 529203,
          status: 'Released',
        })
        .expect(201);

      const foundMovie = await Movie.findOne({ _id: response.body._id });
      const foundMovieId = foundMovie._id.toString();

      expect(response.body._id).to.equal(foundMovieId);
      expect(response.body.title).to.equal(foundMovie.title);
      expect(response.body.overview).to.equal(foundMovie.overview);
      expect(response.body.popularity).to.equal(foundMovie.popularity);
      expect(response.body.poster_path).to.equal(foundMovie.poster_path);
      expect(response.body.backdrop_path).to.equal(foundMovie.backdrop_path);
      expect(response.body.runtime).to.equal(foundMovie.runtime);
      expect(response.body.genre).to.have.same.members(foundMovie.genre);
      expect(response.body.tmdb_id).to.equal(foundMovie.tmdb_id);
      expect(response.body.status).to.equal(foundMovie.status);
    });
  });

  describe('PATCH /api/v1/movies/:movieId', () => {
    it('should update a movie', async () => {
      const expectedMovie = new Movie({
        title: 'TEST Movie',
        overview:
          "After leaving their cave, the Croods encounter their biggest threat since leaving: another family called the Bettermans, who claim to be better and evolved. But after Eep and the Bettermans' only daughter escape, the two families must put aside their differences to save them.",
        popularity: 151,
        poster_path:
          'https://image.tmdb.org/t/p/w342/8u1JT7w94Mi20pH3UYv2gUnyXSY.jpg',
        backdrop_path:
          'https://image.tmdb.org/t/p/original/mqmHhAf7OhJq5Tq81p7wFI0Fnde.jpg',
        runtime: 90,
        genre: ['Adventure', 'Family', 'Fantasy'],
        release_date: '2020-11-25',
        tmdb_id: 529203,
        status: 'Released',
      });
      await expectedMovie.save();

      const updatedInfo = {
        title: 'TEST MovieUpdated',
      };

      await supertest(app)
        .patch(`/api/v1/movies/${expectedMovie._id}`)
        .send(updatedInfo);

      const foundUpdatedMovie = await Movie.findOne({ _id: expectedMovie._id });

      expect(updatedInfo.title).to.equal(foundUpdatedMovie.title);
    });
  });

  describe('DELETE /api/v1/movies/:movieId', () => {
    it('should delete a movie', async () => {
      const expectedMovie = new Movie({
        title: 'TEST Movie',
        overview:
          "After leaving their cave, the Croods encounter their biggest threat since leaving: another family called the Bettermans, who claim to be better and evolved. But after Eep and the Bettermans' only daughter escape, the two families must put aside their differences to save them.",
        popularity: 151,
        poster_path:
          'https://image.tmdb.org/t/p/w342/8u1JT7w94Mi20pH3UYv2gUnyXSY.jpg',
        backdrop_path:
          'https://image.tmdb.org/t/p/original/mqmHhAf7OhJq5Tq81p7wFI0Fnde.jpg',
        runtime: 90,
        genre: ['Adventure','Family','Fantasy'],
        release_date: '2020-11-25',
        tmdb_id: 529203,
        status: 'Released',
      });
      await expectedMovie.save();

      await supertest(app)
        .delete(`/api/v1/movies/${expectedMovie._id}`)
        .expect(200);

      const deletedMovie = await Movie.findOne({ _id: expectedMovie._id });

      // eslint-disable-next-line no-unused-expressions
      expect(deletedMovie).to.be.null;
    });
  });
});
