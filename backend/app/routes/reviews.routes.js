const express = require("express");
const router = express.Router();
const authenticateJwtMiddleware = require("../middlewares/authenticateJwt.middleware");

const reviewsController = require("../controllers/reviews.controller");

router.post("/submitReview", reviewsController.submitReview);
router.get("/getAllReviews", reviewsController.getAllReviews);
router.delete("/deleteReview", authenticateJwtMiddleware, reviewsController.deleteReview);

module.exports = router;
