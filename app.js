const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const gameRoutes = require("./routes/gameRoutes"); // Added game routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchupsRoutes = require("./routes/matchupsRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Body Parser

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/games", gameRoutes); // New route for games
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/player", playerRoutes)
app.use("/api/matchups", matchupsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));