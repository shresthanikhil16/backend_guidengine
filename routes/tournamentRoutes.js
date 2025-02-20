const express = require('express');
const { createTournament, getTournaments, getTournamentNames } = require('../controller/tournamentController');
const router = express.Router();

// Get tournaments by game (moved above to avoid conflicts)
router.get('/:game', getTournaments);

// Create tournament
router.post('/registerGames', createTournament);

router.get('/names/:game', getTournamentNames);

module.exports = router; 