const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    email: String,
    game: String,
    tournament: String,  // Add this line to store tournament name
    teamNumber: String,
});

module.exports = mongoose.model('Player', playerSchema);