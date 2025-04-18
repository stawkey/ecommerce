import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartProduct = ({ product, quantity, onQuantityChange, onRemove }) => {
    const [inputQuantity, setInputQuantity] = useState(quantity);

    useEffect(() => {
        setInputQuantity(quantity);
    }, [quantity]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || (/^\d+$/.test(value) && parseInt(value, 10) <= 99)) {
            setInputQuantity(value);
        }
    };

    const handleQuantityUpdate = () => {
        const newQuantity = parseInt(inputQuantity, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            const diff = newQuantity - quantity;
            if (diff !== 0) {
                onQuantityChange(diff);
            }
        } else {
            setInputQuantity(quantity);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleQuantityUpdate();
            e.target.blur();
        }
    };

    return (
        <div className="flex flex-row px-4 py-8">
            <div className="w-1/5">
                <img className="rounded-xl" src={product.image} alt={product.name} />
            </div>
            <div className="flex items-center w-2/5">
                <h2 className="p-4 text-3xl">{product.name}</h2>
            </div>
            <div className="flex items-center justify-center w-1/5">
                <button
                    onClick={() => onQuantityChange(-1)}
                    className="hover:cursor-pointer p-2 text-2xl"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                    type="text"
                    value={inputQuantity}
                    onChange={handleInputChange}
                    onBlur={handleQuantityUpdate}
                    onKeyDown={handleKeyDown}
                    className="w-12 p-2 text-3xl text-center rounded-md"
                />
                <button
                    onClick={() => onQuantityChange(1)}
                    className="hover:cursor-pointer p-2 text-2xl"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="flex flex-col items-end justify-center w-1/5">
                <h3 className="text-3xl">{product.price} pln</h3>
                <button onClick={onRemove} className="hover:cursor-pointer">
                    Remove
                </button>
            </div>
        </div>
    );
};

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");
            setCart(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load cart");
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCart();
    }, []);

    const updateQuantity = async (productId, change) => {
        try {
            await api.put(`/cart/products/${productId}`, { quantity: change });
            fetchCart();
        } catch (err) {
            console.error(err);
            setError("Failed to update quantity");
        }
    };

    const removeProduct = async (productId) => {
        try {
            await api.delete(`/cart/products/${productId}`);
            fetchCart();
        } catch (err) {
            console.error(err);
            setError("Failed to remove product");
        }
    };

    if (!cart || !cart.products || cart.products.length === 0) {
        return (
            <div>
                <div className="flex flex-col items-center mt-8">
                    <div className="mb-4 text-2xl">Your cart is empty</div>
                    <Link
                        to="/"
                        className="text-lg py-2 px-4 bg-[#efe0dc] rounded-lg hover:opacity-90 transition-opacity mb-4"
                    >
                        <span className="text-[#171819]">Continue Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center m-8">
                {loading && <LoadingSpinner />}
                {error && <ErrorBox error={error} setError={setError} />}
                <div className="w-2/3 divide-y divide-[#efe0dc] border-y border-[#efe0dc]">
                    {cart.products.map((item) => (
                        <CartProduct
                            key={item.productId._id}
                            product={item.productId}
                            quantity={item.quantity}
                            onQuantityChange={(change) =>
                                updateQuantity(item.productId._id, change)
                            }
                            onRemove={() => removeProduct(item.productId._id)}
                        />
                    ))}
                </div>
                <div className="mt-8 text-4xl">Total: {cart.totalPrice} pln</div>
                <Link to="/checkout">
                    <div className="text-3xl py-2 px-3 mt-8 rounded-2xl bg-[#efe0dc] text-[#171819] hover:bg-opacity-90 transition-opacity">
                        Check out
                    </div>
                </Link>
            </div>
            <div className="mt-30"></div>
        </div>
    );
};

export default CartPage;
