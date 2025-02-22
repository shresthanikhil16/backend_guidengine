const Matchup = require('../model/Matchups');  // Assuming you have a Matchup model

// Save matchups
const saveMatchups = async (req, res) => {
    try {
        const { tournament, matchups } = req.body;

        // Create a new matchup entry
        const newMatchup = new Matchup({ tournament, matchups });
        await newMatchup.save(); // Save the new matchup to the database

        res.status(201).json({ message: "Matchups saved successfully", matchups: newMatchup });
    } catch (error) {
        console.error("Error saving matchups:", error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 status code
    }
};

// Get matchups by tournament
const getMatchupsByTournament = async (req, res) => {
    const { tournament } = req.params; // Get the tournament parameter from the request

    try {
        // Find matchups where tournament matches the provided tournament
        const matchups = await Matchup.find({ tournament });
        if (!matchups.length) {
            return res.status(404).json({ message: "No matchups found." }); // Respond with a 404 if no matchups are found
        }
        res.json(matchups); // Return the found matchups as a JSON response
    } catch (error) {
        console.error("Error fetching matchups:", error); // Log the error for debugging
        res.status(500).json({ message: error.message }); // Respond with a 500 status code and the error message
    }
};
const getUniqueTournaments = async (req, res) => {
    try {
        const tournaments = await Matchup.distinct("tournament"); // Get unique tournament names
        res.json(tournaments); // Return the unique tournament names
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { saveMatchups, getMatchupsByTournament, getUniqueTournaments }; // Export the functions