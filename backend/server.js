require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to the database!"))
    .catch((err) => console.error("Error connecting to the database: ", err));

// mongoose
//     .connect(process.env.DB_URI)
//     .then(() => {
//         console.log("Connected to the database!");
//         return mongoose.connection.db.dropDatabase();
//     })
//     .then(() => {
//         console.log("Database cleared!");
//     })
//     .catch((err) => console.error("Error connecting to the database: ", err));

// app.get("/", (req, res) => {
//     res.json({ message: "Server running!" });
// });

app.use("/api/auth", require("./app/routes/auth.routes"));
app.use("/api/orders", require("./app/routes/order.routes"));
app.use("/api/cart", require("./app/routes/cart.routes"));
app.use("/api/products", require("./app/routes/product.routes"));
app.use("/api/categories", require("./app/routes/category.routes"));
app.use("/api/featured-products", require("./app/routes/featuredProduct.routes"));
app.use(require("./app/middlewares/errorHandler.middleware"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
