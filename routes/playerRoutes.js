const express = require('express');
const { registerPlayer, getRegisteredPlayers } = require('../controller/playerController');
const router = express.Router();

// Get all registered players
router.get('/players', getRegisteredPlayers);

// Register a player for a tournament
router.post('/registerPlayer', registerPlayer);

module.exports = router;