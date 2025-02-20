const Winner = require("../model/winnerModel");


// Add a tournament winner
const addWinner = async (req, res) => {
    try {
        const { tournamentId, winner } = req.body;

        if (!tournamentId || !winner) {
            return res.status(400).json({ error: "Tournament ID and Winner name are required" });
        }

        // Validate that the tournament exists
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        // Validate that the player exists in the tournament
        const player = await Player.findOne({ name: winner, tournament: tournament.name });
        if (!player) {
            return res.status(404).json({ error: "Winner not found in the tournament" });
        }

        // Save the winner to the database
        const newWinner = new Winner({ tournament: tournament.name, winner });
        await newWinner.save();

        return res.status(201).json({ message: "Winner saved successfully", winner: newWinner });
    } catch (error) {
        console.error("Error saving tournament winner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all tournament winners
const getWinners = async (req, res) => {
    try {
        const winners = await Winner.find();

        if (!winners.length) {
            return res.status(404).json({ message: "No tournament winners found" });
        }

        res.status(200).json(winners);
    } catch (error) {
        console.error("Error fetching tournament winners:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addWinner, getWinners };
