const Winner = require("../model/winnerModel");
const Player = require("../model/Player");

// Function to add a winner
const addWinner = async (req, res) => {
    const { tournamentId, winner } = req.body; // tournamentId is actually the tournament name

    try {
        console.log("Received Data:", req.body);

        // Find the player with the given tournament name and winner name
        const player = await Player.findOne({ name: winner.trim(), tournament: tournamentId.trim() });

        if (!player) {
            console.error("Winner not found in tournament:", winner);
            return res.status(404).json({ error: "Winner not found in the tournament" });
        }

        // Save the winner (using tournament name instead of ID)
        const newWinner = new Winner({ tournament: tournamentId.trim(), winner: winner.trim() });
        await newWinner.save();

        return res.status(201).json({ message: "Winner saved successfully", winner: newWinner });
    } catch (error) {
        console.error("Error saving tournament winner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Function to get all winners
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

module.exports = {
    addWinner,
    getWinners,
};