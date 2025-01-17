const mongoose = require("mongoose");

const db = {};
db.user = require("./user.model");
db.cart = require("./cart.model");
db.order = require("./orders.model");
db.review = require("./review.model");

module.exports = db;
