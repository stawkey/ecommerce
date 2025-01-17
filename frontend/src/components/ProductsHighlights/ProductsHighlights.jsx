import React, { useEffect, useState } from "react";
import style from "./ProductsHighlights.module.css";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const ProductsHighlights = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handlingLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    };

    const handlingRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    };

    const cuttingText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const elements = [
        products[currentIndex % products.length],
        products[(currentIndex + 1) % products.length],
        products[(currentIndex + 2) % products.length],
        products[(currentIndex + 3) % products.length],
    ];

    const handleAddToCart = async (event, product) => {
        // event.preventDefault();
        try {
            await api.post("/cart/add", {
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            });

            await api.get("/cart");
            // await api.post(
            //     "/cart/remove",
            //     {
            //         productId: product.id,
            //         title: product.title,
            //         price: product.price,
            //         quantity: 1,
            //     }
            // );
        } catch (error) {
            console.log(" Failed to add to cart");
        }
    };

    if (products.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.container}>
            <div className={style.items}>
                {elements.map((product, index) => (
                    <div
                        key={product.id || index}
                        className={style.productCard}
                        onSubmit={handleAddToCart}
                    >
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} />
                            <h4>{cuttingText(product.title, 15)}</h4>
                            <p>{product.price} $</p>
                        </Link>
                        <button type="submit" onClick={(event) => handleAddToCart(event, product)}>
                            &#128722; Add to cart
                        </button>
                    </div>
                ))}
            </div>
            <button className={style.leftArrow} onClick={handlingLeft}>
                &#11164;
            </button>
            <button className={style.rightArrow} onClick={handlingRight}>
                &#11166;
            </button>
        </div>
    );
};

export default ProductsHighlights;
