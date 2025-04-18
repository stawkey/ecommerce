const mongoose = require("mongoose");
const db = require("../models");
const Order = db.order;
const Cart = db.cart;

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate({ path: "products.productId", select: "name image price" });

        res.status(200).json({ orders });
    } catch (err) {
        console.error("Error in getUserOrders:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.addOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req.user.id;
        const { shippingInfo, paymentInfo } = req.body;

        if (!shippingInfo || !paymentInfo) {
            return res
                .status(400)
                .json({ message: "Please provide shipping information and payment information" });
        }

        const cart = await Cart.findOne({ userId }).populate("products.productId").session(session);

        if (!cart || !cart.products || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const [firstName, ...lastNameParts] = shippingInfo.name.split(" ");
        const formattedShippingInfo = {
            firstName: firstName,
            lastName: lastNameParts.join(" "),
            street: shippingInfo.address,
            city: shippingInfo.city,
            zipCode: shippingInfo.postalCode,
            country: shippingInfo.country,
        };

        const products = cart.products.map((product) => ({
            productId: product.productId._id,
            quantity: product.quantity,
            price: product.productId.price,
        }));

        const order = new Order({
            userId,
            products: products,
            totalPrice: cart.totalPrice,
            shippingInfo: formattedShippingInfo,
            paymentInfo,
            status: "p",
        });

        await order.save({ session });

        cart.products = [];
        cart.totalPrice = mongoose.Types.Decimal128.fromString("0");
        await cart.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ order });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error in addOrder:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId).populate({
            path: "products.productId",
            select: "name image",
        });

        res.status(200).json({ order });
    } catch (err) {
        console.error("Error in getOrderById:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Please provide a status" });
        }

        // p - pending, r - preparing, s - shipping, d - delivered, c - cancelled
        const validStatuses = ["p", "r", "s", "d", "c"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message:
                    "Invalid status. Must be one of: p (pending), r (preparing), s (shipping), d (delivered), c (cancelled)",
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this order" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ order });
    } catch (err) {
        console.error("Error in updateOrderStatus:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!["p", "r"].includes(order.status)) {
            return res.status(400).json({
                message: `Cannot cancel order with status: ${order.status} (${
                    order.status === "s"
                        ? "shipping"
                        : order.status === "d"
                        ? "delivered"
                        : "cancelled"
                })`,
            });
        }

        order.status = "c";
        await order.save();

        return res.status(200).json({ order });
    } catch (err) {
        console.error("Error in cancelOrder:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};
