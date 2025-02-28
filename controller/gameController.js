const Game = require("../model/Games");

const addGame = async (req, res) => {
    // ... (your existing addGame function) ...
};

const getGames = async (req, res) => {
    // ... (your existing getGames function) ...
};

const getGameNames = async (req, res) => {
    // ... (your existing getGameNames function) ...
};

const getAllGameNames = async (req, res) => {
    try {
        const games = await Game.find().distinct('name'); // Get distinct game names
        res.status(200).json(games);
    } catch (error) {
        console.error("Error fetching game names:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
};

module.exports = { addGame, getGames, getGameNames, getAllGameNames }; // Add getAllGameNames to exports