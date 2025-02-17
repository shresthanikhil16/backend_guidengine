const Game = require("../model/Games");

const addGame = async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;

        // Validate request body
        if (!name || !description || !imageUrl) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newGame = new Game({ name, description, imageUrl });
        await newGame.save();

        res.status(201).json(newGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addGame, getGames };