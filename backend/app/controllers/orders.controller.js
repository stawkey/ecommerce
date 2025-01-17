const Cart = require("../models/cart.model");
const Order = require("../models/orders.model");

exports.addOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        const totalCost = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = new Order({
            userId,
            items: cart.items,
            totalCost,
        });

        await newOrder.save();
        console.log(newOrder);

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create order" });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user orders" });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate("userId", "firstName lastName email");
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch order details" });
    }
};

