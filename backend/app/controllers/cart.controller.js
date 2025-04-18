const db = require("../models");
const Cart = db.cart;
const Product = db.product;

exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: "Please provide user id" });
        }

        let cart = await Cart.findOne({ userId }).populate({
            path: "products.productId",
            select: "name price image",
        });

        if (!cart) {
            cart = new Cart({ userId, products: [], totalPrice: 0 });
        } else {
            await cart.calculateTotal();
        }
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error("Error in getUserCart:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res
                .status(400)
                .json({ message: "Please provide userId, productId, quantity >= 1" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product does not exist" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart({ userId, products: [], totalPrice: 0 });
        }

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({
                productId,
                quantity,
            });
        }

        cart.calculateTotal();
        cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error("Error in addToCart:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.updateCartProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!userId || !productId || quantity === undefined || quantity === null) {
            return res.status(400).json({ message: "Please provide userId, productId, quantity" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product does not exist" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

        if (productIndex > -1) {
            const newQuantity = cart.products[productIndex].quantity + quantity;

            if (newQuantity <= 0) {
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity = newQuantity;
            }

            await cart.calculateTotal();
            await cart.save();

            res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (err) {
        console.error("Error in updateCartProduct:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        if (!userId || !productId) {
            return res
                .status(400)
                .json({ message: "Please provide userId, productId, quantity >= 1" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product does not exist" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
        cart.products.splice(productIndex, 1);

        cart.calculateTotal();
        cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error("Error in removeFromCart:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: "Please provide user id" });
        }

        let cart = await Cart.findOneAndDelete({ userId });

        res.status(200).json(cart);
    } catch (err) {
        console.error("Error in deleteCart:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
