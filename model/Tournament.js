const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: String,
    game: String,
    startDate: Date,
    endDate: Date,
    prize: String,
    description: String,
});

module.exports = mongoose.model('Tournament', tournamentSchema);