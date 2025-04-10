const mongoose = require("mongoose");

const featuredProductSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        backgroundColor: { type: String },
        displayOrder: { type: Number, default: 0 },
    },
    { timestamps: true }
);

featuredProductSchema.index({ displayOrder: 1 });

const FeaturedProduct = mongoose.model("FeaturedProduct", featuredProductSchema);
module.exports = FeaturedProduct;
