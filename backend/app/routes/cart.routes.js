const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");

router.get("/", authenticateJwtMiddleware, cartController.getUserCart);
router.post("/products", authenticateJwtMiddleware, cartController.addToCart);
router.put("/products/:productId", authenticateJwtMiddleware, cartController.updateCartProduct);
router.delete("/products/:productId", authenticateJwtMiddleware, cartController.removeFromCart);
router.delete("/", authenticateJwtMiddleware, cartController.deleteCart);

module.exports = router;
