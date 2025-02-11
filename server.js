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

// Sample in-memory database
let hotels = [];
let bookings = [];
let rooms = [];
let users = [];

// Authentication Endpoints
app.post("/auth/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = { id: users.length + 1, email, password };
    users.push(user);
    res.status(201).json({ message: "User registered successfully", user });
});

app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", token: "fake-jwt-token" });
});

// Hotel Endpoints
app.get("/hotels", (req, res) => res.json(hotels));
app.post("/hotels", (req, res) => {
    const hotel = { id: hotels.length + 1, ...req.body };
    hotels.push(hotel);
    res.status(201).json(hotel);
});
app.patch("/hotels/:id", (req, res) => {
    const hotel = hotels.find(h => h.id == req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    Object.assign(hotel, req.body);
    res.json(hotel);
});
app.delete("/hotels/:id", (req, res) => {
    hotels = hotels.filter(h => h.id != req.params.id);
    res.status(204).send();
});

// Room Endpoints
app.get("/hotels/:hotelId/rooms", (req, res) => {
    const hotelRooms = rooms.filter(r => r.hotelId == req.params.hotelId);
    res.json(hotelRooms);
});
app.post("/hotels/:hotelId/rooms", (req, res) => {
    const room = { id: rooms.length + 1, hotelId: req.params.hotelId, ...req.body };
    rooms.push(room);
    res.status(201).json(room);
});
app.patch("/hotels/:hotelId/rooms/:roomId", (req, res) => {
    const room = rooms.find(r => r.id == req.params.roomId && r.hotelId == req.params.hotelId);
    if (!room) return res.status(404).json({ message: "Room not found" });
    Object.assign(room, req.body);
    res.json(room);
});
app.delete("/hotels/:hotelId/rooms/:roomId", (req, res) => {
    rooms = rooms.filter(r => r.id != req.params.roomId || r.hotelId != req.params.hotelId);
    res.status(204).send();
});

// Booking Endpoints
app.get("/bookings", (req, res) => res.json(bookings));
app.post("/bookings", (req, res) => {
    const booking = { id: bookings.length + 1, ...req.body };
    bookings.push(booking);
    res.status(201).json(booking);
});
app.patch("/bookings/:id", (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    Object.assign(booking, req.body);
    res.json(booking);
});
app.delete("/bookings/:id", (req, res) => {
    bookings = bookings.filter(b => b.id != req.params.id);
    res.status(204).send();
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Internal Server Error",
        details: err.details || {}
    });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));