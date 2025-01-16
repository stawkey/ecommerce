const Cart = require("../models/cart.model");
const User = db.user;

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.addItemToCart = async (req, res) => {
    console.log("AAAAAA");
    try {
        console.log("req body: ", req.body);
        const { productId, title, price, quantity } = req.body;
        console.log("req body: ", req.body);
        if (!productId || !title || !price || !quantity) {
            return res.status(400).json({ error: "Invalid input data" });
        }
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        let itemIndex = 0
        for (let i = 0; i < cart.items.length(); i++) {
            if (cart.items[i].productId === productId) {
                itemIndex = i;
                break;
            }
        }
        // const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > 0) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, title, price, quantity });
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

