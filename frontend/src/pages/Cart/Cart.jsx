import { React, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Cart.module.css";
import DeliveryForm from "../../components/DeliveryForm/DeliveryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";

const Cart = () => {
    const [shopping, setShopping] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const handleShopping = () => setShopping(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                console.log("huh");
                const response = await api.get("/cart");
                console.log("huh");
                setCartItems(response.data.items || []);
                calculateTotalCost(response.data.items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, []);

    const addExistingProduct = async (product) => {
        try {
            const response = await api.post("/cart/add", {
                productId: product.productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
            setCartItems(response.data.items);
            calculateTotalCost(response.data.items);
            console.log("Added to cart");
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const removeExistingProduct = async (product) => {
        try {
            const response = await api.post("/cart/remove", {
                productId: product.productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
            setCartItems(response.data.items);
            calculateTotalCost(response.data.items);
            console.log("Removed from cart");
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    const placeOrder = async () => {
        try {
            await api.post("/orders/add");
            console.log("done1");
            await api.get("/cart/clear");
            console.log("done2");
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const calculateTotalCost = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalCost(total);
    };

    return (
        <div>
            <Navbar />
            <div className={style.wholeContainer}>
                <div className={style.cartContainer}>
                    <h1>Items in your cart: </h1>
                    {cartItems.length > 0 ? (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.productId} className={style.cartItem}>
                                    <div>
                                        <strong>{item.title}</strong>
                                    </div>
                                    <div>
                                        <img src={item.image} className={style.cartImage} />
                                    </div>
                                    <div>Price: ${item.price}</div>
                                    <div>Quantity: {item.quantity}</div>
                                    <button onClick={() => addExistingProduct(item)}>+</button>
                                    <button onClick={() => removeExistingProduct(item)}>-</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Your cart is empty!</p>
                    )}
                </div>
                <div className={style.test}>
                    <DeliveryForm className={style.deliveryForm} />
                    <div className={style.cartSummary}>
                        <h2>ORDER SUMMARY: </h2>
                        <ul>
                            <li>Total items cost: ${totalCost.toFixed(2)}</li>
                            <li>Delivery cost: {totalCost > 0 ? "$5.00" : "-"}</li>
                            <li>
                                Total cost for order:{" "}
                                {totalCost > 0 ? "$" + (totalCost + 5).toFixed(2) : "-"}
                            </li>
                        </ul>
                        <Link to="/">
                            <button className={style.orderNow} onClick={placeOrder}>
                                <FontAwesomeIcon icon={faCartShopping} className={style.cartIcon} />{" "}
                                ORDER NOW{" "}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
