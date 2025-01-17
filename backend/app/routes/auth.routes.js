const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");

const authController = require("../controllers/auth.controller");

router.post("/register", authController.createUser);
router.post("/login", authController.authenticateUser);
router.post("/logout", authController.logout);
router.get("/is-authenticated", authenticateJwtMiddleware, (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});
router.get("/getUserProfile", authenticateJwtMiddleware, authController.getUserProfile);
router.get("/isAdmin", authenticateJwtMiddleware, authController.isAdmin);

module.exports = router;
