# Booking.com clone Backend API

## Overview
A Node.js/Express.js backend service for managing accommodations, rooms, bookings, and users. The API provides comprehensive endpoints for a booking platform with in-memory data storage.

## Features
- Accommodation management (CRUD operations)
- Room management for accommodations
- Booking system
- User authentication and management
- OpenAPI/Swagger documentation
- CORS support
- Error handling middleware

## Tech Stack
- Node.js
- Express.js
- Swagger UI (API documentation)
- CORS
- dotenv (environment configuration)
- js-yaml (OpenAPI documentation parsing)

## Project Structure
```
booking-backend/
├── server.js        # Main application file
├── openapi.yaml     # API documentation
├── .env            # Environment variables
└── package.json    # Dependencies and scripts
```

## Prerequisites
- Node.js (LTS version)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/booking-backend.git
cd booking-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
PORT=3000
```

4. Start the server:
```bash
npm start
```

The server will start at `http://localhost:3000` (or your specified PORT).

## API Documentation
The API documentation is available through Swagger UI at `/docs` endpoint when the server is running.

### Available Endpoints

#### Accommodations
- `GET /accommodations` - List all accommodations
- `POST /accommodations` - Create a new accommodation
- `PATCH /accommodations/:id` - Update an accommodation
- `DELETE /accommodations/:id` - Delete an accommodation

#### Rooms
- `GET /rooms` - List all rooms
- `POST /rooms` - Create a new room
- `PATCH /rooms/:id` - Update a room
- `DELETE /rooms/:id` - Delete a room

#### Bookings
- `GET /bookings` - List all bookings
- `POST /bookings` - Create a new booking
- `PATCH /bookings/:id` - Update a booking
- `DELETE /bookings/:id` - Delete a booking

#### Users
- `GET /users` - List all users (passwords excluded)
- `POST /users` - Register a new user
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

#### Authentication
- `POST /sessions` - User login

## Data Models

### Accommodation
```javascript
{
  id: number,
  name: string,
  city: string,
  address: string,
  rating: number
}
```

### Room
```javascript
{
  id: number,
  accommodationId: number,
  type: string,
  price: number
}
```

### Booking
```javascript
{
  id: number,
  accommodationId: number,
  userName: string,
  checkInDate: string,
  checkOutDate: string
}
```

### User
```javascript
{
  id: number,
  email: string,
  name: string,
  password: string // Not returned in responses
}
```

## Security Considerations
- Passwords are currently stored in plaintext (not recommended for production)
- Authentication uses a mock JWT token
- No rate limiting implemented
- In-memory storage (not suitable for production)

## Development Notes
- The application uses in-memory arrays for data storage
- All IDs are auto-generated incrementally
- CORS is enabled for all origins
- Basic error handling is implemented
- Input validation is performed for required fields

## Future Improvements
1. Implement proper password hashing
2. Add proper JWT authentication
3. Integrate with a real database
4. Add input validation middleware
5. Implement rate limiting
6. Add logging system
7. Add unit and integration tests
8. Add proper error handling middleware
9. Implement data persistence

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
