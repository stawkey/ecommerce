const mongoose = require("mongoose");

const db = {};
db.user = require("./user.model");
db.cart = require("./cart.model");
db.order = require("./orders.model");
db.product = require("./product.model");
db.category = require("./category.model");
db.featuredProduct = require("./featuredProduct.model");

module.exports = db;
