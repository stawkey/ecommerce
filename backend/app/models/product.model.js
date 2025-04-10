const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Types;

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
        description: { type: String, required: true, trim: true },
        image: { type: String, required: true },
        price: { type: Decimal128, required: true, min: 0, get: priceToFloat, set: priceToDecimal },
        specifications: { type: Map, of: String },
    },
    { timestamps: true, toJSON: { getters: true } }
);

function priceToFloat(value) {
    if (typeof value !== "undefined") {
        return parseFloat(value.toString());
    }
    return value;
}

function priceToDecimal(value) {
    if (!isNaN(value)) {
        return Decimal128.fromString(value);
    }
    return Decimal128.fromString("0");
}

productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
