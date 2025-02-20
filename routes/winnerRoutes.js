const express = require("express");
const { addWinner, getWinners } = require("../controller/winnerController");

const router = express.Router();

// Route to add a tournament winner
router.post("/addwinners", addWinner);

// Route to get all tournament winners
router.get("/winners", getWinners);

module.exports = router;
