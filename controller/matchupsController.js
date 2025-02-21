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
    const { tournament } = req.params;

    try {
        // Find matchups where tournament matches the provided tournament
        const matchups = await Matchup.find({ tournament });
        if (!matchups.length) {
            return res.status(404).json({ message: "No matchups found." });
        }
        res.json(matchups); // Return matchups
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { saveMatchups, getMatchupsByTournament };