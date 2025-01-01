const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:8000",
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "Server running!" });
});

const authRoutes = require("./app/routes/auth.routes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
