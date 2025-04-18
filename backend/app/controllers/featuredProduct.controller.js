const db = require("../models");
const FeaturedProduct = db.featuredProduct;

exports.getAllFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await FeaturedProduct.find()
            .populate("product")
            .sort({ displayOrder: 1 });

        const transformedProducts = featuredProducts.map((fp) => ({
            _id: fp._id,
            product: fp.product._id,
            title: fp.title,
            subtitle: fp.subtitle,
            backgroundColor: fp.backgroundColor || "#ffffff",
            image: fp.product ? fp.product.image : "",
            productId: fp.product ? fp.product._id : null,
        }));

        res.status(200).json(transformedProducts);
    } catch (err) {
        console.error("Error in getAllFeaturedProducts:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.addFeaturedProduct = async (req, res) => {
    try {
        const newFeaturedProduct = new FeaturedProduct(req.body);
        await newFeaturedProduct.save();
        res.status(201).json(newFeaturedProduct);
    } catch (err) {
        console.error("Error in addFeaturedProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.updateFeaturedProduct = async (req, res) => {
    try {
        const featuredProduct = await FeaturedProduct.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!featuredProduct) return res.status(404).json({ error: "Featured product not found" });
        res.status(200).json(featuredProduct);
    } catch (err) {
        console.error("Error in updateFeaturedProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.deleteFeaturedProduct = async (req, res) => {
    try {
        const featuredProduct = await FeaturedProduct.findByIdAndDelete(req.params.id);
        if (!featuredProduct) return res.status(404).json({ error: "Featured product not found" });
        res.status(200).json("Featured product deleted");
    } catch (err) {
        console.error("Error in deleteFeaturedProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
