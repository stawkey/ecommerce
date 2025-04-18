const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, reguired: true, default: 0 },
    },
    { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
