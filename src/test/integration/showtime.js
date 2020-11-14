// const supertest = require('supertest');
// const { expect } = require('chai');
// const mongoose = require('mongoose');
// const app = require('../../server');
// const { connect } = require('../../config/database');
// const ShowTime = require('../../models/showtime');

// describe('Testing ShowTime Endpoints ', () => {
//   beforeEach(() => {
//     connect();
//   });

//   afterEach(async () => {
//     await ShowTime.deleteMany();
//     mongoose.connection.close();
//   });

//   describe('GET /api/v1/showtime', () => {
//     it('should return all showtimes', async () => {
//       const expectedShowTime = new ShowTime({
//         startDate: '2020-12-01',
//         startAt: '12:30',
//         endAt: '2020-12-01',
//         movieId: '5fa6f46899169350dc3744a5',
//         cinemaRoomId: '5fa880c6dded804a54cadb75',
//       });
//       await expectedShowTime.save();

//       const response = await supertest(app).get('/api/v1/showtime').expect(200);
//       expect(response.body[0].startDate).to.equal('2020-12-01T00:00:00.000Z');
//       expect(response.body[0].startAt).to.equal(expectedShowTime.startAt);
//       expect(response.body[0].endAt).to.equal('2020-12-01T00:00:00.000Z');
//       expect(response.body[0].movieId).to.equal('5fa6f46899169350dc3744a5');
//       expect(response.body[0].cinemaRoomId).to.equal(
//         '5fa880c6dded804a54cadb75'
//       );
//     });
//   });

//   describe('GET /api/v1/showtime/:showtimeId', () => {
//     it('should return a showtime by id', async () => {
//       const expectedShowTime = new ShowTime({
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

//       const foundShowTime = await ShowTime.findOne({ _id: response.body._id });
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
//       const expectedShowTime = new ShowTime({
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

//       const deletedShowTime = await ShowTime.findOne({
//         _id: expectedShowTime._id,
//       });

//       // eslint-disable-next-line no-unused-expressions
//       expect(deletedShowTime).to.be.null;
//     });
//   });
// });
