const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendResetPasswordMail, forgotPassword, resetPassword } = require('../controller/authController');
const { reset } = require("nodemon");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);
router.post('/sendResetMailPassword', sendResetPasswordMail);
router.post('/resetPassword', resetPassword);



module.exports = router;
