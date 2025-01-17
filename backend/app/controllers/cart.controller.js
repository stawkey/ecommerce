const Cart = require("../models/cart.model");
// const User = db.user;

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.addItemToCart = async (req, res) => {
    console.log("AAAAAA");
    try {
        console.log(req.user);
        const { productId, title, price, image, quantity } = req.body;
        if (!productId || !title || !price || !image || !quantity) {
            return res.status(400).json({ error: "Invalid input data" });
        }
        // if (!req.user || !req.user.id) {
        //     return res.status(401).json({ error: "Unauthorized" });
        // }
        const userId = req.user.id;
        // console.log("a tu?")

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        // const itemIndex = -1
        // console.log(cart)
        // for (let i = 0; i < cart.items.length; i++) {
        //     console.log('a?')
        //     if (cart.items[i].productId == productId) {
        //         itemIndex = i;
        //         break;
        //     }
        // }
        // console.log(productId)
        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        console.log(cart)
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, title, price, image, quantity });
            // console.log(cart.items)
        }

        await cart.save();
        console.log("a pod sam koniec?")
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
    console.log("lol")
    try {
        // console.log(cart)
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        console.log("GET:")
        console.log(cart)
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

