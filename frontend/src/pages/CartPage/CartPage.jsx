import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CartProduct from "../../components/CartProduct/CartProduct";
import api from "../../utils/api";
import Footer from "../../components/Footer/Footer";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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

    if (loading)
        return (
            <div>
                <Navbar />
                <LoadingSpinner />
                <Footer />
            </div>
        );
    if (!cart || !cart.products || cart.products.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="flex flex-col items-center mt-8">
                    <div className="mb-4 text-2xl">Your cart is empty</div>
                    <Link
                        to="/"
                        className="text-lg py-2 px-4 bg-[#efe0dc] rounded-lg hover:opacity-90 transition-opacity mb-4"
                    >
                        <span className="text-[#171819]">Continue Shopping</span>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center m-8">
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
            <div className="mt-30">
                <Footer />
            </div>
        </div>
    );
};

export default CartPage;
