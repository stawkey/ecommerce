const db = require("../models");
const User = db.user;

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

function generateCSRFToken() {
    return crypto.randomBytes(32).toString("hex");
}

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
};

exports.authenticateUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "1h",
        });

        const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "7d",
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 1 * 60 * 60 * 1000, // 1 hour
        });

        const csrfToken = generateCSRFToken();
        res.setHeader("X-CSRF-Token", csrfToken);
        res.cookie("csrf_token", csrfToken, {
            httpOnly: true,
            sameSite: "Strict",
        });

        res.status(200).json({ message: "User authenticated successfully" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred during authentication" });
    }
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "1h",
        });

        const newRefreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "7d",
        });

        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 1 * 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ message: "Tokens refreshed successfully" });
    });
};

exports.logout = (req, res) => {
    try {
        res.clearCookie("refresh_token", { httpOnly: true, sameSite: "Strict" });
        res.clearCookie("access_token", { httpOnly: true, sameSite: "Strict" });
        res.clearCookie("csrf_token", { httpOnly: true, sameSite: "Strict" });

        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred during logout" });
    }
};
