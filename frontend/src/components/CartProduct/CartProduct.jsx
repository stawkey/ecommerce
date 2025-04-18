import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartProduct = ({ product, quantity, onQuantityChange, onRemove }) => {
    return (
        <div className="flex flex-row px-4 py-8">
            <div className="w-1/5">
                <img className="rounded-xl" src={product.image} alt={product.name} />
            </div>
            <div className="w-2/5 flex items-center">
                <h2 className="p-4 text-3xl">{product.name}</h2>
            </div>
            <div className="w-1/5 flex items-center justify-center">
                <button
                    onClick={() => onQuantityChange(-1)}
                    className="text-2xl p-2 hover:cursor-pointer"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <div className="text-3xl p-2">{quantity}</div>
                <button
                    onClick={() => onQuantityChange(1)}
                    className="text-2xl p-2 hover:cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="w-1/5 flex items-end justify-center flex-col">
                <h3 className="text-3xl">{product.price} pln</h3>
                <button onClick={onRemove} className="hover:cursor-pointer">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartProduct;
