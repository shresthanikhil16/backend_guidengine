const express = require("express");
const router = express.Router();
const matchupController = require("../controllers/matchupController");

// Save matchups
router.post("/matchups", matchupController.saveMatchups);

// Get matchups by tournament
router.get("/matchups/:tournament", matchupController.getMatchups);

module.exports = router;
