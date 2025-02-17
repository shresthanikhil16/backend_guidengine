const Tournament = require("../model/Tournament");
const Player = require("../model/Player");

// Create Tournament
const createTournament = async (req, res) => {
    try {
        const { name, game, startDate, endDate, prize, description } = req.body;

        // Validate required fields for creating tournament
        if (!name || !game || !startDate || !endDate || !prize || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTournament = new Tournament({
            name,
            game,
            startDate,
            endDate,
            prize,
            description,
        });

        await newTournament.save();
        res.status(201).json({ message: "Tournament created successfully!", tournament: newTournament });
    } catch (error) {
        console.error("Error creating tournament:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Tournaments by Game
const getTournaments = async (req, res) => {
    const { game } = req.params;
    console.log(`Fetching tournaments for game: "${game}"`);

    try {
        const tournaments = await Tournament.find({
            game: { $regex: new RegExp(`^${game.trim()}$`, 'i') }  // Trim spaces and make it case-insensitive
        });
        console.log("Tournaments found:", tournaments);

        if (!tournaments.length) {
            return res.status(404).json({ message: `No tournaments found for game: ${game}` });
        }

        res.status(200).json(tournaments);
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




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

module.exports = { createTournament, getTournaments, registerPlayer };