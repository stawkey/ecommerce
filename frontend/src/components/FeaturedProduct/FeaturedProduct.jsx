import React from "react";

const FeaturedProduct = ({ product, reverse }) => {
    return (
        <a href={product.link}>
            <div
                className={`flex flex-col items-center justify-center mt-20 ${
                    reverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
                style={{ backgroundColor: product.color }}
            >
                <div className="text-center md:w-1/3 p-4">
                    <h1 className="text-4xl md:text-5xl font-bold">{product.title}</h1>
                    <p className="text-lg">{product.subtitle}</p>
                </div>
                <div className="w-1/3 flex justify-center">
                    <img src={product.img} className="md:w-100 m-8 rounded-lg" />
                </div>
            </div>
        </a>
    );
};

export default FeaturedProduct;
