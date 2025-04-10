const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");
const featuredProductController = require("../controllers/featuredProduct.controller");

router.get("/", featuredProductController.getAllFeaturedProducts);
router.post("/", authenticateJwtMiddleware, featuredProductController.addFeaturedProduct);
router.put("/:id", authenticateJwtMiddleware, featuredProductController.updateFeaturedProduct);
router.delete("/:id", authenticateJwtMiddleware, featuredProductController.deleteFeaturedProduct);

module.exports = router;
