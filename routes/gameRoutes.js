const express = require("express");
const { addGame, getGames } = require("../controller/gameController");

const router = express.Router();

router.post("/games", addGame);
router.get("/games", getGames);

module.exports = router;