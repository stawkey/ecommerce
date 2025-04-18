const db = require("../models");
const User = db.user;

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.authenticateUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "30d",
        });

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 5 * 60 * 1000, // 5 minutes
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({ message: "Success!" });
    } catch (err) {
        console.error("Error in authenticateUser:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.logout = (req, res) => {
    try {
        res.clearCookie("refresh_token", { httpOnly: true, sameSite: "Strict" });
        res.clearCookie("access_token", { httpOnly: true, sameSite: "Strict" });

        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        console.error("Error in logout:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const accessToken = req.cookies.access_token;

        if (!accessToken) {
            return res.status(401).json({ message: "No access token provided" });
        }

        jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }

            const user = await User.findById(decoded.id).select("firstName lastName email");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            });
        });
    } catch (err) {
        console.error("Error in getUserProfile:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
