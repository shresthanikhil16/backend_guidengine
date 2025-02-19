const Matchups = require("../models/Matchups");

// Save matchups
const saveMatchups = async (req, res) => {
    try {
        const { tournament, matchups } = req.body;

        await Matchups.findOneAndUpdate(
            { tournament },
            { matchups },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: "Matchups saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving matchups", error });
    }
};

// Get matchups by tournament
const getMatchups = async (req, res) => {
    try {
        const { tournament } = req.params;
        const matchups = await Matchups.findOne({ tournament });

        if (!matchups) {
            return res.status(404).json({ message: "No matchups found" });
        }

        res.status(200).json(matchups.matchups);
    } catch (error) {
        res.status(500).json({ message: "Error fetching matchups", error });
    }
};

module.exports = {
    saveMatchups,
    getMatchups
};
