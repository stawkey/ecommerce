import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./ProductPage.module.css";
import Navbar from "../../components/Navbar/Navbar";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = async () => {
        if (quantity <= 0) {
            alert("Quantity must be at least 1");
            return;
        }
        // cart handling needed asap
    };

    if (!product) {
        return (
            <div>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
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
                <h2>OPINIONS:</h2>
            </div>
        </div>
    );
};

export default ProductPage;
