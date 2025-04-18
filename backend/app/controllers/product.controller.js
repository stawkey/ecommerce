const db = require("../models");
const Product = db.product;

exports.searchProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, q = "" } = req.query;
        if (limit > 50) {
            limit = 50;
        }
        const skip = (page - 1) * limit;

        let query = {};
        if (q) {
            query = {
                $text: {
                    $search: q,
                },
            };
        }

        const products = await Product.find(query)
            .populate("categories")
            .skip(skip)
            .limit(limit)
            .exec();

        const noProducts = await Product.countDocuments(query);
        const noPages = Math.ceil(noProducts / limit);

        res.status(200).json({
            products,
            pagination: {
                currentPage: parseInt(page),
                noPages,
                noProducts,
                limit: parseInt(limit),
            },
        });
    } catch (err) {
        console.error("Error in searchProducts:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categories");
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        console.error("Error in getProductById:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error in addProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        console.error("Error in updateProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Product  not found" });
        res.status(200).json("Product deleted");
    } catch (err) {
        console.error("Error in deleteProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
