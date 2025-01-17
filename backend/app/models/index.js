const mongoose = require("mongoose");

const db = {};
db.user = require("./user.model");
db.cart = require("./cart.model");
db.order = require("./orders.model");

module.exports = db;
