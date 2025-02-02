const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");
const ordersController = require("../controllers/orders.controller");

router.post("/add", authenticateJwtMiddleware, ordersController.addOrder);
router.get("/user", authenticateJwtMiddleware, ordersController.getUserOrders);
router.get("/:id", authenticateJwtMiddleware, ordersController.getOrderDetails);

module.exports = router;
