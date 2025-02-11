const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load OpenAPI documentation
const swaggerDocument = yaml.load(fs.readFileSync("openapi.yaml", "utf8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory "database" collections (using const since we will mutate the arrays)
const accommodations = []; // corresponds to the Accommodation schema
const rooms = [];          // corresponds to the Room schema
const bookings = [];       // corresponds to the Booking schema
const users = [];          // corresponds to the User schema

/**
 * Accommodations Endpoints
 * GET /accommodations - Get all accommodations
 * POST /accommodations - Create a new accommodation
 * PATCH /accommodations/:id - Update an accommodation
 * DELETE /accommodations/:id - Delete an accommodation
 */
app.get("/accommodations", (req, res) => {
    res.json(accommodations);
});

app.post("/accommodations", (req, res) => {
    const { name, city, address, rating } = req.body;
    if (!name || !city || !address || rating === undefined) {
        return res.status(400).json({ message: "Name, city, address and rating are required" });
    }
    const newAccommodation = {
        id: accommodations.length + 1,
        name,
        city,
        address,
        rating
    };
    accommodations.push(newAccommodation);
    res.status(201).json(newAccommodation);
});

app.patch("/accommodations/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const accommodation = accommodations.find(a => a.id === id);
    if (!accommodation) {
        return res.status(404).json({ message: "Accommodation not found" });
    }
    Object.assign(accommodation, req.body);
    res.json(accommodation);
});

app.delete("/accommodations/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = accommodations.findIndex(a => a.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Accommodation not found" });
    }
    accommodations.splice(index, 1);
    res.status(204).send();
});

/**
 * Rooms Endpoints
 * GET /rooms - Get all rooms
 * POST /rooms - Create a new room
 * PATCH /rooms/:id - Update a room
 * DELETE /rooms/:id - Delete a room
 */
app.get("/rooms", (req, res) => {
    res.json(rooms);
});

app.post("/rooms", (req, res) => {
    const { accommodationId, type, price } = req.body;
    if (!accommodationId || !type || price === undefined) {
        return res.status(400).json({ message: "AccommodationId, type, and price are required" });
    }
    const newRoom = {
        id: rooms.length + 1,
        accommodationId,
        type,
        price
    };
    rooms.push(newRoom);
    res.status(201).json(newRoom);
});

app.patch("/rooms/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const room = rooms.find(r => r.id === id);
    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }
    Object.assign(room, req.body);
    res.json(room);
});

app.delete("/rooms/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Room not found" });
    }
    rooms.splice(index, 1);
    res.status(204).send();
});

/**
 * Bookings Endpoints
 * GET /bookings - Get all bookings
 * POST /bookings - Create a new booking
 * PATCH /bookings/:id - Update a booking
 * DELETE /bookings/:id - Delete a booking
 */
app.get("/bookings", (req, res) => {
    res.json(bookings);
});

app.post("/bookings", (req, res) => {
    const { accommodationId, userName, checkInDate, checkOutDate } = req.body;
    if (!accommodationId || !userName || !checkInDate || !checkOutDate) {
        return res.status(400).json({ message: "AccommodationId, userName, checkInDate and checkOutDate are required" });
    }
    const newBooking = {
        id: bookings.length + 1,
        accommodationId,
        userName,
        checkInDate,
        checkOutDate
    };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

app.patch("/bookings/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    Object.assign(booking, req.body);
    res.json(booking);
});

app.delete("/bookings/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Booking not found" });
    }
    bookings.splice(index, 1);
    res.status(204).send();
});

/**
 * Users Endpoints
 * GET /users - Get all users (without passwords)
 * POST /users - Register a new user
 * PATCH /users/:id - Update a user
 * DELETE /users/:id - Delete a user
 */
app.get("/users", (req, res) => {
    // Return users without passwords
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
});

app.post("/users", (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json({ message: "Email, name, and password are required" });
    }
    // Check if user already exists
    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.status(409).json({ message: "User already exists" });
    }
    const newUser = {
        id: users.length + 1,
        email,
        name,
        password // In a real application, never store plaintext passwords
    };
    users.push(newUser);
    // Return the user without the password
    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
});

app.patch("/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    Object.assign(user, req.body);
    const { password, ...safeUser } = user;
    res.json(safeUser);
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(index, 1);
    res.status(204).send();
});

/**
 * Sessions Endpoint
 * POST /sessions - User login
 */
app.post("/sessions", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // In a real app, you would generate a JWT token here
    res.status(200).json({ token: "fake-jwt-token" });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Internal Server Error",
        details: err.details || {}
    });
});

/**
 * Start Server
 */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});