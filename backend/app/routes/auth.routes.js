const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");

router.post("/register", authController.createUser);
router.post("/login", authController.authenticateUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
module.exports = router;
