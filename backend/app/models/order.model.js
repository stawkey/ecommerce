const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Types;

const { priceToFloat, priceToDecimal } = require("./utils/priceHelpers");

const OrderProductSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Decimal128, required: true, min: 0, get: priceToFloat, set: priceToDecimal },
});

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [OrderProductSchema],
        totalPrice: {
            type: Decimal128,
            required: true,
            min: 0,
            get: priceToFloat,
            set: priceToDecimal,
        },
        status: {
            type: String,
            enum: ["p", "r", "s", "d", "c"],
            default: "p",
            required: true,
        },
        shippingInfo: {
            firstName: String,
            lastName: String,
            street: String,
            city: String,
            zipCode: String,
            country: String,
        },
        paymentInfo: {
            method: String,
            transactionId: String,
            status: String,
        },
    },
    { timestamps: true, toJSON: { getters: true } }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
