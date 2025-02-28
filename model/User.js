const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Allowed roles
            default: 'user', // Default to 'user'
        },
        token: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

// 🔹 Encrypt password using bcrypt before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔹 Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// 🔹 Match user-entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// 🔹 Export the User model **AFTER** defining methods
const User = mongoose.model('User', userSchema);
module.exports = User;
