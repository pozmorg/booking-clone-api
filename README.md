# Booking Backend

## Overview
This repository contains the backend for the booking system, handling authentication, hotels, rooms, and bookings.

## Project Structure
```
booking-backend/
│── openapi.yaml     # OpenAPI documentation for API endpoints
│── package.json     # Project metadata and dependencies
│── server.js        # Main server file with Express.js
```

## API Documentation
- The full API documentation is available at `/docs`.
- Opening this endpoint in a browser launches the **Swagger UI**, where all available API endpoints are documented and can be tested.

## Installation
### Prerequisites
- Node.js (latest LTS version recommended)
- npm

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/booking-backend.git
   cd booking-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
- **Authentication**
   - `POST /auth/register` - Register a new user
   - `POST /auth/login` - Authenticate a user and receive a token
- **Hotels**
   - `GET /hotels` - Get all hotels
   - `POST /hotels` - Create a new hotel
   - `PATCH /hotels/{hotelId}` - Update a hotel
   - `DELETE /hotels/{hotelId}` - Delete a hotel
- **Rooms**
   - `GET /hotels/{hotelId}/rooms` - Get all rooms in a hotel
   - `POST /hotels/{hotelId}/rooms` - Add a new room
   - `PATCH /hotels/{hotelId}/rooms/{roomId}` - Update a room
   - `DELETE /hotels/{hotelId}/rooms/{roomId}` - Delete a room
- **Bookings**
   - `GET /bookings` - Get all bookings
   - `POST /bookings` - Create a booking
   - `PATCH /bookings/{bookingId}` - Update a booking
   - `DELETE /bookings/{bookingId}` - Cancel a booking

## Contribution
Feel free to contribute to the project by submitting issues or pull requests.

## License
This project is licensed under the MIT License.
