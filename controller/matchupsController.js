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
        console.log("🔍 Requested Tournament:", tournament); // Debugging

        const matchupDoc = await Matchup.findOne({ tournament });

        if (!matchupDoc) {
            console.log("❌ No matchups found for:", tournament);
            return res.status(404).json({ message: "No matchups found for this tournament" });
        }

        res.status(200).json(matchupDoc.matchups);
    } catch (error) {
        console.error("⚠ Error fetching matchups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = { saveMatchups, getMatchupsByTournament };