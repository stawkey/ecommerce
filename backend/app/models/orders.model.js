const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: Number,
            title: String,
            price: Number,
            quantity: Number,
        }
    ],
    totalCost: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;