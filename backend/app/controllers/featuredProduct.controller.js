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
        console.error(err);
        res.status(500).json({ error: "An error occurred while getting featured products" });
    }
};

exports.addFeaturedProduct = async (req, res) => {
    try {
        const newFeaturedProduct = new FeaturedProduct(req.body);
        await newFeaturedProduct.save();
        res.status(201).json(newFeaturedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding a featured product" });
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
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating a featured product" });
    }
};

exports.deleteFeaturedProduct = async (req, res) => {
    try {
        const featuredProduct = await FeaturedProduct.findByIdAndDelete(req.params.id);
        if (!featuredProduct) return res.status(404).json({ error: "Featured product not found" });
        res.status(200).json("Featured product deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting a featured product" });
    }
};
