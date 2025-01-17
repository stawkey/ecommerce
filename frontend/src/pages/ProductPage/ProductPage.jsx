import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./ProductPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../utils/api";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await api.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await api.get(`/reviews/getAllReviews/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/auth/getUserProfile", {
                    withCredentials: true,
                });
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchProductDetails();
        fetchReviews();
        fetchUserProfile();
    }, [id]);

    const handleAddToCart = async () => {
        if (quantity <= 0) {
            alert("Quantity must be at least 1");
            return;
        }
    };

    const handleSubmitReview = async () => {
        if (!newReview) {
            alert("Please enter a review.");
            return;
        }

        if (!user) {
            alert("You must be logged in to submit a review.");
            return;
        }

        const reviewData = {
            productId: id,
            userId: user.userId,
            content: newReview,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        console.log(reviewData);

        try {
            const response = await api.post("/reviews/submitReview", reviewData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 201) {
                setReviews([...reviews, reviewData]);
                setNewReview("");
            } else {
                alert("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await api.delete(`/reviews/deleteReview/${reviewId}`);
            if (response.status === 200) {
                setReviews(reviews.filter((review) => review.id !== reviewId));
            } else {
                alert("Failed to delete review");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    if (loading) {
        return (
            <div className={style.loading}>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className={style.pageContainer}>
                <div className={style.productDetailsContainer}>
                    <img src={product.image} alt={product.title} className={style.productImage} />
                    <ul>
                        <li>
                            <h1>{product.title}</h1>
                        </li>
                        <li>
                            <p>
                                <strong>Category:</strong> {product.category}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Description:</strong> {product.description}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Price:</strong> ${product.price.toFixed(2)}
                            </p>
                        </li>
                        <li>
                            <div className={style.addToCartSection}>
                                <label>
                                    Quantity:
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className={style.quantityInput}
                                    />
                                </label>
                                <button onClick={handleAddToCart} className={style.addToCartButton}>
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={style.opinionBox}>
                    <h2>Reviews</h2>
                    <div className={style.reviewForm}>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Write a review..."
                            className={style.textarea}
                        />
                        <button onClick={handleSubmitReview} className={style.submitReviewButton}>
                            Submit Review
                        </button>
                    </div>

                    <div className={style.reviewList}>
                        {reviews.map((review) => (
                            <div key={review.id} className={style.review}>
                                <p>
                                    <strong>
                                        {review.firstName} {review.lastName}
                                    </strong>{" "}
                                    ({new Date(review.submitDate).toLocaleDateString()})
                                </p>
                                <p>{review.content}</p>
                                <button
                                    onClick={() => handleDeleteReview(review.id)}
                                    className={style.deleteReviewButton}
                                >
                                    Delete Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
