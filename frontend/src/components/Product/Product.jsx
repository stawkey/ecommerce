import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <div className="flex flex-col w-1/3 p-4">
            <Link to={`/products/${product._id}`}>
                <div className="rounded-xl p-4 bg-black">
                    <img className="rounded-xl" src={product.image} />
                    <div className="px-3 pt-2">
                        <div className="text-xl">{product.name}</div>
                        <div className="flex justify-between w-full">
                            <div className="">
                                {product.categories.map((category) => category.name).join(", ")}
                            </div>
                            <div className="">{product.price} pln</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
