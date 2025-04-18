const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Types;

function priceToFloat(value) {
    if (typeof value !== "undefined") {
        return parseFloat(value.toString());
    }
    return value;
}

function priceToDecimal(value) {
    if (!isNaN(value)) {
        return Decimal128.fromString(value.toString());
    }
    return Decimal128.fromString("0");
}

module.exports = { priceToFloat, priceToDecimal };
