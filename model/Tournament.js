const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    game: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prize: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Tournament", TournamentSchema);
