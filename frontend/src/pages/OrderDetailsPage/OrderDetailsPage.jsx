import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./OrderDetailsPage.module.css";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket
} from "@fortawesome/free-solid-svg-icons";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await api.get(`/orders/${id}`, { withCredentials: true });
                setOrder(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (!order) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Navbar />
            <div className={style.orderDetails}>
                <h2>Order Details</h2>
                <p><strong>Total cost:</strong> ${order.totalCost.toFixed(2)}</p>
                <ul>
                    {order.items.map((item) => (
                        <li key={item.productId}>
                            <Link to={`/product/${item.productId}`}>
                            <p><strong>{item.title}</strong></p>
                            </Link>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                <Link to="/profile" ><button className={style.backLink}><FontAwesomeIcon icon={faArrowRightToBracket} /> Go back to profile</button></Link>
            </div>
        </>
    );
};

export default OrderDetailsPage;
