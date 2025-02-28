const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const upload = require("../middleware/uploads");

const {
    getUser,
    getUsers,
    register,
    login,
    uploadImage,
    getMe,
} = require("../controller/userController");

router.post("/uploadImage", upload, uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/getUser", protect, getUser);
router.get("/getAllUser", getUsers);
router.get("/getMe", protect, getMe);

module.exports = router;
