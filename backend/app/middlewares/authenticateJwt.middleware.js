const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const authenticateJwt = async (req, res, next) => {
    console.log("Middleware start")
    try {
        expressJwt({
            secret: process.env.SECRET_KEY,
            algorithms: ["HS256"],
            requestProperty: "user",
            getToken: (req) => req.cookies.access_token,
        })(req, res, async (err) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    try {
                        const response = await axios.post(
                            "/api/auth/refresh",
                            {},
                            { withCredentials: true }
                        );
                        if (response.status === 200) {
                            return next();
                        } else {
                            return res.status(401).json({ message: "Unable to refresh token" });
                        }
                    } catch (error) {
                        return res.status(401).json({ message: "Refresh token failed" });
                    }
                }
                return res.status(401).json({ message: "Invalid token" });
            }
            next();
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = authenticateJwt;
