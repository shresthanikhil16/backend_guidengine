const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
    tournament: { type: String, required: true },
    winner: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Winner", winnerSchema);