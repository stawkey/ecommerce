import React from "react";

const Product = ({ product }) => {
    return (
        <div className="flex flex-col w-1/3 p-4">
            <div className="bg-black rounded-xl p-4">
                <img className="rounded-xl" src={product.img} />
                <div className="px-3 pt-2">
                    <div className="text-xl">{product.name}</div>
                    <div className="w-full flex justify-between">
                        <div className="">{product.category}</div>
                        <div className="">{product.price} pln</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
