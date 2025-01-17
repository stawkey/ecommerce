const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJwt = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            expressJwt({
                secret: process.env.SECRET_KEY,
                algorithms: ["HS256"],
                requestProperty: "user",
                getToken: (req) => req.cookies.access_token,
            })(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        next();
    } catch (err) {
        if (err.name === "UnauthorizedError") {
            try {
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
                        expiresIn: "15m",
                    });

                    const newRefreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                        algorithm: "HS256",
                        expiresIn: "30d",
                    });

                    res.cookie("access_token", accessToken, {
                        httpOnly: true,
                        sameSite: "Strict",
                        maxAge: 5 * 60 * 1000, // 5 minutes
                    });

                    res.cookie("refresh_token", newRefreshToken, {
                        httpOnly: true,
                        sameSite: "Strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                    });

                    return res.status(200).json({ message: "Tokens refreshed successfully" });
                });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = authenticateJwt;
