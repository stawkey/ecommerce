const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");

router.post("/add", authenticateJwtMiddleware, cartController.addItemToCart);
router.post("/remove", authenticateJwtMiddleware, cartController.removeItemFromCart);
router.get("/", authenticateJwtMiddleware, cartController.getUserCart);
router.post("/update", authenticateJwtMiddleware, cartController.updateItemQuantity);
router.get("/clear", authenticateJwtMiddleware, cartController.clearCart);

module.exports = router;


