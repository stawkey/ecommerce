import React from "react";

const FeaturedProduct = ({ product, reverse }) => {
    return (
        <a href={`/products/${product.product}`}>
            <div
                className={`flex flex-col items-center justify-center mt-20 ${
                    reverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
                style={{ backgroundColor: product.backgroundColor }}
            >
                <div className="md:w-1/3 p-4 text-center">
                    <h1 className="md:text-5xl text-4xl font-bold">{product.title}</h1>
                    <p className="text-lg">{product.subtitle}</p>
                </div>
                <div className="flex justify-center w-1/3">
                    <img src={product.image} className="md:w-100 m-8 rounded-lg" />
                </div>
            </div>
        </a>
    );
};

export default FeaturedProduct;
