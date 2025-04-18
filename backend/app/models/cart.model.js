const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Types;
const Decimal = require("decimal.js");

const { priceToFloat, priceToDecimal } = require("./utils/priceHelpers");

const CartProductSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
    },
    { timestamps: true }
);

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [CartProductSchema],
        totalPrice: {
            type: Decimal128,
            default: mongoose.Types.Decimal128.fromString("0"),
            get: priceToFloat,
            set: priceToDecimal,
        },
    },
    { timestamps: true, toJSON: { getters: true } }
);

CartSchema.methods.calculateTotal = async function () {
    let total = new Decimal(0);

    if (
        this.products.length > 0 &&
        this.products[0].productId &&
        !this.products[0].productId.price
    ) {
        await this.populate({
            path: "products.productId",
            select: "name price image",
        });
    }

    for (let item of this.products) {
        if (item.productId && typeof item.productId === "object") {
            const price = new Decimal(item.productId.price.toString());
            const quantity = new Decimal(item.quantity);
            total = price.times(quantity);
        }
    }

    this.totalPrice = mongoose.Types.Decimal128.fromString(total.toString());
    return this.totalPrice;
};

module.exports = mongoose.model("Cart", CartSchema);
