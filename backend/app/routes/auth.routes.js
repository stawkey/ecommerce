const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/register", authController.createUser);
router.post("/login", authController.authenticateUser);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

module.exports = router;
