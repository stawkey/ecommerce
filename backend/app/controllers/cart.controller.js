const Cart = require("../models/cart.model");

exports.addItemToCart = async (req, res) => {
    try {
        const { productId, name, price, image, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, name, price, image, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to add item to cart" });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
};

exports.updateItemQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json(cart);
        }

        res.status(404).json({ message: "Item not found in cart" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update item quantity" });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to get cart" });
    }
};

exports.syncCart = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        items.forEach(({ productId, name, price, image, quantity }) => {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, name, price, image, quantity });
            }
        });

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to sync cart" });
    }
};

