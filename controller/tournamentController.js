const Tournament = require("../model/Tournament");

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
            game: { $regex: new RegExp(`^${game.trim()}$`, 'i') }
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

// Get Tournament Names by Game
const getTournamentNames = async (req, res) => {
    const { game } = req.params;
    console.log(`Fetching tournament names for game: "${game}"`);

    try {
        // Fetch only the 'name' field for tournaments of the given game
        const tournamentNames = await Tournament.find({
            game: { $regex: new RegExp(`^${game.trim()}$`, 'i') }
        }).select('name');  // Only include the 'name' field

        if (!tournamentNames.length) {
            return res.status(404).json({ message: `No tournaments found for game: ${game}` });
        }

        res.status(200).json(tournamentNames);  // Return only the names
    } catch (error) {
        console.error("Error fetching tournament names:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createTournament, getTournaments, getTournamentNames };
