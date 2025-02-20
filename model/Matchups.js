const mongoose = require("mongoose");

const MatchupSchema = new mongoose.Schema({
    tournament: { type: String, required: true, unique: true },
    matchups: [
        {
            participant1: String,
            participant2: String
        }
    ]
});

module.exports = mongoose.model("Matchups", MatchupSchema);