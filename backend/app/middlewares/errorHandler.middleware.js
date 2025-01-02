const errorHandler = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Invalid or missing token" });
    }

    res.status(500).json({ message: "Internal server error", error: err.message });
};

module.exports = errorHandler;
