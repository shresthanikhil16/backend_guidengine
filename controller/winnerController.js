const Winner = require("../model/winnerModel");

// Add a tournament winner
const addWinner = async (req, res) => {
    try {
        const { tournament, winner } = req.body;

        // Validate input
        if (!tournament || !winner) {
            return res.status(400).json({ error: "Tournament name and winner name are required" });
        }

        // Save to database
        const newWinner = new Winner({ tournament, winner });
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
        const winners = await Winner.find().sort({ date: -1 });

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
