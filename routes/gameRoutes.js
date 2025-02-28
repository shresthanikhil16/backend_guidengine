const express = require("express");
const { addGame, getGames, getGameNames, getAllGameNames } = require("../controller/gameController"); // Add getAllGameNames

const router = express.Router();

router.post("/games", addGame);
router.get("/games", getGames);
router.get("/gamesname", getGameNames);
router.get("/allnames", getAllGameNames); // Add this line

module.exports = router;