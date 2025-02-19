const Matchup = require('../model/Matchups');  // Assuming you have a Matchup model

// Save matchups
const saveMatchups = async (req, res) => {
    try {
        const { tournament, matchups } = req.body;

        // Create a new matchup entry
        const newMatchup = new Matchup({ tournament, matchups });
        await newMatchup.save();

        res.status(201).json({ message: "Matchups saved successfully", matchups: newMatchup });
    } catch (error) {
        console.error("Error saving matchups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get matchups by tournament
const getMatchupsByTournament = async (req, res) => {
    try {
        const { tournament } = req.params;

        // Check if the tournament parameter is provided
        if (!tournament) {
            return res.status(400).json({ error: "Tournament parameter is required" });
        }

        // Fetch matchups from the database based on the tournament
        const matchups = await Matchup.find({ tournament });

        // If no matchups are found, send a 404 response
        if (!matchups.length) {
            return res.status(404).json({ message: "No matchups found for this tournament" });
        }

        // Respond with the matchups data
        res.status(200).json(matchups);
    } catch (error) {
        console.error("Error fetching matchups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { saveMatchups, getMatchupsByTournament };
