const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");

router.post("/add", cartController.addItemToCart);
router.post("/remove", cartController.removeItemFromCart);
router.get("/", cartController.getUserCart);
router.post("/update", cartController.updateItemQuantity);
router.post("/sync", cartController.syncCart);

module.exports = router;


