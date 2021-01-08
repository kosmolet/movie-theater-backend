
[![Actions Status](https://github.com/kosmolet/movie-theater-backend/workflows/Cinema%20backend/badge.svg?branch=main)](https://github.com/kosmolet/movie-theater-backend/actions)  [![Actions Status](https://github.com/kosmolet/movie-theater-backend/workflows/Run%20Lint/badge.svg?branch=main)](https://github.com/kosmolet/movie-theater-backend/actions) 
## Backend for Moviestaden cinema app   

#### Firestore version is in this [repository](https://github.com/kosmolet/movie-theater-backend-firestore)  

### Setup 

Create `.env` file in the root directory of the project, add to the file:    

`MONGO_URI=connection string to mongoDB`  
`DOMAIN='http://localhost:3000/'` (URL where Stripe response should be returned on fronend)   
`PRICE=12500` (real price a ticket should be multiplied on 100 for stripe)
`STRIPE_SK=stripe secret key`   
`NODE_ENV=development`
`PORT=5005`   

### Start

Run `npm run dev` 
Runs on Port 5005 or Port specified in `.env` file

### Routes  

##### Movies  
 1. Create new movie  
   Route: POST 'api/v1/movies'  
   Request Body:   
   {  
    title: String,
    overview: String,  
    popularity: Number,  
    poster_path: String,  
    backdrop_path: String,  
    runtime: Number,
    genres: [String],
    release_date: Date,  
    tmdb_id: Number,  
    status: String    
    }  

2. Read (all movies)
   Route: GET 'api/v1/movies'

3. Read (movie by Id)
   Route: GET 'api/v1/movies/movieId'

4. Update(movie by Id)
   Route: PATCH 'api/v1/movies/movieId'
   Request Body: {any field from POST}

5. Delete(movie by Id)
   Route: DELETE 'api/v1/movies/movieId'

##### Showtimes

1. Create (new showtime for a specific movie)
   Route: POST 'api/v1/movies/movieId/showtimes'
   Request Body:  
   {  
    startAt: Date,  
    endAt: Date,  
    hallName: string,  
    unavailableSeats: [Number]  
    city: string,  
    movie: movieId
    }

2. Read (all showtimes for a specific movie)
   Route: GET 'api/v1/movies/movieId/showtimes'

3. Read (showtime by Id)
   Route: GET 'api/v1/movies/movieId/showtimes/showtimeId'

4. Update(showtime by Id)
   Route: PATCH 'api/v1/movies/movieId/showtimes/showtimeId'
   Request Body: {any field from POST}

5. Delete(showtime by Id)
   Route: DELETE 'api/v1/movies/movieId/showtimes/showtimeId'

##### Reservations

1. Create (new reservation for a specific showtime)
   Route: POST 'api/v1/movies/movieId/showtimes/showtimeId/reservations'
   Request Body:  
   {  
   username: String  
   email: Date,  
   isPaymentSucceed: Boolean, (default: false)  
   isEmailSend: Boolean, (default: false)
   seats: [Number]  
   totalPrice: Number,  
   showtime: showtimeId
   }  
   
2. Read (all reservations for a specific showtime)
   Route: GET 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
   
3. Read (reservations for a specific showtime )
   Route: GET 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
   
4. Update(reservation by Id)
   Route: PATCH 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
   Request Body:  
   {any field from POST or any of:  
   stripeCustomerId: String,  
   stripeAmountCharged: Number,  
   stripeCheckoutSessionId: String,  
   stripePaymentIntentId: String,  
   stripePaymentCreateAt: Date,  
   }  
   
5. Delete(reservation by Id)
   Route: DELETE 'api/v1/movies/movieId/showtimes/showtimeId/reservations/reservationId'
