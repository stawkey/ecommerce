const Cart = require("../models/cart.model");
// const User = db.user;

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.addItemToCart = async (req, res) => {
    try {
        const { productId, title, price, image, quantity } = req.body;
        if (!productId || !title || !price || !image || !quantity) {
            return res.status(400).json({ error: "Invalid input data" });
        }
        // if (!req.user || !req.user.id) {
        //     return res.status(401).json({ error: "Unauthorized" });
        // }
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        // const itemIndex = -1
        // for (let i = 0; i < cart.items.length; i++) {
        //     if (cart.items[i].productId == productId) {
        //         itemIndex = i;
        //         break;
        //     }
        // }
        const itemIndex = cart.items.findIndex((item) => item.productId === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, title, price, image, quantity });
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

        for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i].productId == productId) {
                cart.items[i].quantity -= 1;
                if (cart.items[i].quantity == 0) {
                    cart.items.splice(i, 1);
                }
                break;
            }
        }
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

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
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

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items = [];
            await cart.save();
        } else {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }

        res.status(200).json(cart); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to clear the cart" });
    }
};
