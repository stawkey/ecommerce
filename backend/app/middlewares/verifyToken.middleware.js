require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(403).json({ message: "Access token required" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired access token" });
        }

        req.user = user;
        next();
    });
};
