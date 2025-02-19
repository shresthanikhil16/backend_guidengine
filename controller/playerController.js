const Player = require("../model/Player");  // Import Player model

// Register Player for Tournament
const registerPlayer = async (req, res) => {
    try {
        const { name, email, game, tournament, teamNumber } = req.body;

        // Validate request body
        if (!name || !email || !game || !tournament || !teamNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new player with the form data
        const newPlayer = new Player({
            name,
            email,
            game,
            teamNumber,
            tournament,  // Add tournament field
        });

        await newPlayer.save();  // Save the player

        return res.status(201).json({
            message: "Player registered successfully!",
            player: newPlayer,
        });
    } catch (error) {
        console.error("Error registering player:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all registered players
const getRegisteredPlayers = async (req, res) => {
    try {
        console.log("✅ Fetching registered players...");

        const players = await Player.find();
        console.log("Fetched Players:", players);

        if (!players.length) {
            return res.status(404).json({ message: "No registered players found" });
        }

        res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching registered players:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { registerPlayer, getRegisteredPlayers };