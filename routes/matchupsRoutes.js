const express = require('express');
const { saveMatchups, getMatchupsByTournament, getUniqueTournaments } = require('../controller/matchupsController');  // Ensure the correct path
const router = express.Router();

// Route to save matchups
router.post('/saveMatchups', saveMatchups);

// Route to get matchups by tournament (updated to match frontend request)
router.get('/matchup/:tournament', getMatchupsByTournament);

router.get('/tournaments', getUniqueTournaments);

module.exports = router;