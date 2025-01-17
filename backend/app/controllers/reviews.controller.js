const db = require("../models");
const Review = db.review;

exports.submitReview = async (req, res) => {
    try {
        if (!req.body.productId || !req.body.userId || !req.body.content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newReview = new Review({
            productId: req.body.productId,
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            submitDate: new Date(),
            content: req.body.content,
        });

        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while submitting the review" });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ productId: productId });

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving reviews" });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.body.id;
        const accessToken = req.cookies.access_token;

        if (!accessToken) {
            return res.status(401).json({ message: "No access token provided" });
        }

        jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }

            const user = await User.findById(decoded.id).select("isAdmin");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const review = await Review.findById(reviewId);

            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            if (user.isAdmin || review.userId === decoded.id) {
                await Review.findByIdAndDelete(reviewId);
                res.status(200).json({ message: "Review deleted successfully" });
            } else {
                res.status(403).json({ message: "You are not authorized to delete this review" });
            }
        });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the review" });
    }
};
