const Message = require("../model/Message");

const sendMessage = async (req, res) => {
    try {
        const sender = req.user.id; // Extracted from token
        const { receiver, text } = req.body;

        if (!sender || !receiver || !text) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newMessage = new Message({ sender, receiver, text });
        await newMessage.save();

        return res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Error sending message" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const loggedInUserId = req.user.id; // Extracted from token

        if (!userId || !loggedInUserId) {
            return res.status(400).json({ message: "Missing user ID" });
        }

        const messages = await Message.find({
            $or: [
                { sender: loggedInUserId, receiver: userId },
                { sender: userId, receiver: loggedInUserId }
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return res.status(500).json({ message: "Error retrieving messages" });
    }
};

module.exports = { sendMessage, getMessages };