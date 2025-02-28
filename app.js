const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const gameRoutes = require("./routes/gameRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchupsRoutes = require("./routes/matchupsRoutes");
const winnerRoutes = require("./routes/winnerRoutes");
const profileUploadMiddleware = require('./middleware/profileUploadMiddleware');
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");  // Corrected import
require('dotenv').config();
// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Body parser to handle JSON requests

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/matchups", matchupsRoutes);
app.use("/api/winners", winnerRoutes);  // Corrected endpoint
app.use('/api/messages', messageRoutes);
app.use(profileUploadMiddleware);

// Serve static files (uploads folder for files like DOCX, images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));