const mongoose = require("mongoose");

const db = {};
db.user = require("./user.model");
db.cart = require("./cart.model");
db.review = require("./review.model");

module.exports = db;
