const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authRoutes = require('../middleware/auth');
const User = require("../models/user");


const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password });

        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await user.comparePassword(password);
        if (!match) return res.status(400).json({ message: "Incorrect password" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({
            message: "Login successful",
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/refresh", (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ message: "Refresh token required" });

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        res.json({
            accessToken: newAccessToken
        });
    });
});

module.exports = router;