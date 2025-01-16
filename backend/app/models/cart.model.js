const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    title: String,
    price: Number,
    quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
});

module.exports = mongoose.model("Cart", CartSchema);