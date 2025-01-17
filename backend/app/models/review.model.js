const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    submitDate: { type: String, required: true },
    content: { type: String, required: true },
});

const Review = new mongoose.model("Review", reviewSchema);
module.exports = Review;
