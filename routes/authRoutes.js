const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendResetPasswordMail, forgotPassword, resetPassword, getProfile, updateProfile,
    getAllUsers, getUserById
} = require('../controller/authController');
const { reset } = require("nodemon");
const { verifyToken } = require("../middleware/authMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const profileUpload = require("../middleware/profileUploadMiddleware");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);
router.post('/sendResetMailPassword', sendResetPasswordMail);
router.post('/resetPassword', resetPassword);
router.get('/profile', verifyToken, getProfile);
router.put("/update-profile", verifyToken, profileUpload, updateProfile);
router.get('/users', verifyToken, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);


module.exports = router;