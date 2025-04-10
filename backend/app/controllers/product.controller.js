const db = require("../models");
const Product = db.product;

exports.searchProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, q = "" } = req.query;
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
        console.error(err);
        res.status(500).json({ error: "An error occurred while getting the products" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categories");
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while getting the product" });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding the product" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating a product" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Product  not found" });
        res.status(200).json("Product deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting a product" });
    }
};
