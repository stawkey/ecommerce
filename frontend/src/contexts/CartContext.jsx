import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.productId === item.productId);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.productId === item.productId
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
    };

    const syncCartWithBackend = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/cart/sync", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: cart }),
            });

            if (response.ok) {
                console.log("Cart synced with backend successfully.");
                localStorage.removeItem("cart");
                setCart([]);
            } else {
                console.error("Failed to sync cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error syncing cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, syncCartWithBackend }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
