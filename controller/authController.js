const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const User = require('../model/User'); // Changed to CommonJ
const config = require('../config/config');

// Register a new user
// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, role } = req.body;
        let profilePicture = req.file ? req.file.path : null;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new user (NO manual hashing here)
        const user = new User({
            username,
            email,
            password,
            role,
            confirmPassword,
            profilePicture,
        });

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "THISISSECRETKEY",
            { expiresIn: "1h" }
        );

        // Save token to user document
        user.token = token;
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error });
    }
};



// Login function (updated for better error handling)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'THISISSECRETKEY',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            role: user.role,
            username: user.username,
            _id: user._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error logging in', error });
    }
};


const forgotPassword = async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send({ success: false, msg: "Email is required" });
    }

    try {
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(404).send({ success: false, msg: "This email does not exist." });
        }

        const randomString = randomstring.generate();
        await User.updateOne({ email }, { $set: { token: randomString } });

        // Debugging email value
        console.log("Recipient Email:", userData.email);

        if (userData.email) {
            sendResetPasswordMail(userData.name, userData.email, randomString);
            return res.status(200).send({ success: true, msg: "Please check your inbox to reset your password." });
        } else {
            console.error("User email is missing.");
            return res.status(400).send({ success: false, msg: "Invalid email address." });
        }
    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        return res.status(500).send({ success: false, msg: error.message });
    }
};


const sendResetPasswordMail = (username, email, token) => {
    console.log("Attempting to send email to:", email); // Debug log

    if (!email) {
        console.error("Recipient email is missing.");
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <p>Hi ${username},</p>
            <p> Welcome to Guide Engine </p>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="http://localhost:5173/resetPassword?token=${token}">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Have a good day !</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error.message); // Log error
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};


const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).send({ success: false, msg: "Token and new password are required." });
    }

    try {
        // Find user by token
        const userData = await User.findOne({ token });

        if (!userData) {
            return res.status(404).send({ success: false, msg: "Invalid or expired token." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the token
        await User.updateOne(
            { _id: userData._id },
            { $set: { password: hashedPassword, token: null } }
        );

        res.status(200).send({ success: true, msg: "Password reset successfully." });
    } catch (error) {
        console.error("Error in resetPassword:", error.message);
        res.status(500).send({ success: false, msg: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        console.log("Decoded user:", req.user); // Debugging log

        const userId = req.user.id; // Get user ID from JWT
        const user = await User.findById(userId).select("-password -token"); // Exclude sensitive fields

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error in getProfile:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { username, email, newPassword } = req.body;
    const userId = req.user.id; // Ensure you're extracting the user ID from the token
    let profilePicture = req.file ? req.file.path : null; // Get the uploaded file path

    try {
        const updateData = { username, email };
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }
        if (profilePicture) {
            updateData.profilePicture = profilePicture; // Update the profile picture path
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ message: 'Error updating profile' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password -token'); // Exclude sensitive fields
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password -token'); // Exclude sensitive fields
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};  

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    sendResetPasswordMail,
    resetPassword,
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
};