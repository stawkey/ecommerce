import React, { useEffect, useState } from 'react';
import style from "./ProductsHighlights.module.css";

const ProductsHighlights = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    function handlingLeft() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1)
    }

    function handlingRight() {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1)
    }

    const cuttingText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const elements = currentIndex === products.length - 1 ? [products[products.length - 1], products[0], products[1], products[2]]
        : currentIndex === products.length - 2 ? [products[products.length - 2], products[products.length - 1], products[0], products[1]]
            : currentIndex === products.length - 3 ? [products[products.length - 3], products[products.length - 2], products[products.length - 1], products[0]]
                : products.slice(currentIndex, currentIndex + 4);


    return (
        <div className={style.container}>
            <div className={style.items}>
                {elements.map((product) => (
                    <div key={product.id} className={style.productCard}>
                        <a href={`/product/${product.id}`}>
                            <img
                                src={product.image}
                                alt={product.title}
                            />
                            <h4>{cuttingText(product.title, 15)}</h4>
                            <p>{product.price} $</p>

                        </a>
                        <button>&#128722; Add to cart</button>
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
