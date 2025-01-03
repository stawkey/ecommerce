const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");
const ordersController = require("../controllers/orders.controller");

router.get("/order-history", authenticateJwtMiddleware, ordersController.orderHistory);

module.exports = router;
