const express = require('express');
const { createTournament, getTournaments, registerPlayer } = require('../controller/tournamentController');
const router = express.Router();

// Create tournament
router.post('/createTournament', createTournament);

router.get('/:game', getTournaments);

// Register a player for a tournament
router.post('/registerGames', registerPlayer);

module.exports = router;