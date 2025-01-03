const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const authenticateJwt = async (req, res, next) => {
    // try {
    await expressJwt({
        secret: process.env.SECRET_KEY,
        algorithms: ["HS256"],
        requestProperty: "user",
        getToken: (req) => req.cookies.access_token,
    })(req, res, async () => {
        next();
    });
    // } catch (err) {
    //     if (err.name === "TokenExpiredError") {
    //         await axios.post("/api/auth/refresh", {}, { withCredentials: true });
    //         next();
    //     }
    // }
};

module.exports = authenticateJwt;
