const express = require("express");
const { sendMessage, getMessages } = require("../controller/messageController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, sendMessage); // Send a message
router.get("/:userId", verifyToken, getMessages); // Get messages with a user

module.exports = router;