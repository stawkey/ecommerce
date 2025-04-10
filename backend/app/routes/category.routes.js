const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategories);
router.post("/", authenticateJwtMiddleware, categoryController.addCategory);
router.put("/:id", authenticateJwtMiddleware, categoryController.updateCategory);
router.delete("/:id", authenticateJwtMiddleware, categoryController.deleteCategory);

module.exports = router;
