const mongoose = require("mongoose");

const db = {};
db.user = require("./user.model");
db.cart = require("./cart.model");

module.exports = db;
