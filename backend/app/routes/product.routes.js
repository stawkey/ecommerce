const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");
const productController = require("../controllers/product.controller");

router.get("/", productController.searchProducts);
router.get("/:id", productController.getProductById);
router.post("/", authenticateJwtMiddleware, productController.addProduct);
router.put("/:id", authenticateJwtMiddleware, productController.updateProduct);
router.delete("/:id", authenticateJwtMiddleware, productController.deleteProduct);

module.exports = router;
