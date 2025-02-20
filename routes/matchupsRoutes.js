const express = require('express');
const { saveMatchups, getMatchupsByTournament } = require('../controller/matchupsController');  // Ensure the correct path
const router = express.Router();

// Route to save matchups
router.post('/saveMatchups', saveMatchups);

// Route to get matchups by tournament (updated to match frontend request)
router.get('/tournament/:tournament', getMatchupsByTournament);

module.exports = router;