const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");
const orderController = require("../controllers/order.controller");

router.post("/", authenticateJwtMiddleware, orderController.addOrder);
router.get("/", authenticateJwtMiddleware, orderController.getUserOrders);
router.get("/:id", authenticateJwtMiddleware, orderController.getOrderById);
router.patch("/:id/status", authenticateJwtMiddleware, orderController.updateOrderStatus);
router.patch("/:id/cancel", authenticateJwtMiddleware, orderController.cancelOrder);

module.exports = router;
