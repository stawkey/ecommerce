import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const OrderProduct = ({ orderItem }) => {
    const product = orderItem.productId;
    const quantity = orderItem.quantity;
    const price = orderItem.price;

    return (
        <div className="flex flex-row px-4 py-8">
            <div className="w-1/5">
                <img className="rounded-xl" src={product.image} alt={product.name} />
            </div>
            <div className="flex items-center w-2/5">
                <h2 className="p-4 text-3xl">{product.name}</h2>
            </div>
            <div className="flex items-center ml-auto text-3xl">
                {quantity} <FontAwesomeIcon icon={faXmark} className="mx-2 text-xl" /> {price} pln
            </div>
        </div>
    );
};

const OrderStatusBadge = ({ status }) => {
    const statusMap = {
        p: { text: "Pending", color: "bg-yellow-200 text-yellow-800" },
        r: { text: "Preparing", color: "bg-blue-200 text-blue-800" },
        s: { text: "Shipping", color: "bg-purple-200 text-purple-800" },
        d: { text: "Delivered", color: "bg-green-200 text-green-800" },
        c: { text: "Cancelled", color: "bg-red-200 text-red-800" },
    };

    const { text, color } = statusMap[status] || {
        text: "Unknown",
        color: "bg-gray-200 text-gray-800",
    };

    return <span className={`${color} px-4 py-2 rounded-full text-sm`}>{text}</span>;
};

const OrderPage = () => {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            setOrder(response.data.order);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load order");
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchOrder();
    }, [orderId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    return (
        <div>
            <div className="flex flex-col items-center m-8">
                {loading && <LoadingSpinner />}
                {error && <ErrorBox error={error} setError={setError} />}

                {order && (
                    <>
                        <div className="w-2/3 mb-6">
                            <div className="flex gap-4 mb-4">
                                <OrderStatusBadge status={order.status} />
                                <h1 className="text-3xl font-bold">Order #{order._id}</h1>
                            </div>
                            <p className="text-lg">Placed on: {formatDate(order.createdAt)}</p>

                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div className="my-4">
                                    <h2 className="mb-2 text-xl font-semibold">
                                        Shipping information
                                    </h2>
                                    <p>
                                        {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                                    </p>
                                    <p>{order.shippingInfo.street}</p>
                                    <p>
                                        {order.shippingInfo.city}, {order.shippingInfo.zipCode}
                                    </p>
                                    <p>{order.shippingInfo.country}</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="w-2/3 mb-4 text-2xl font-semibold text-left">Order Items</h2>
                        <div className="w-2/3 divide-y divide-[#efe0dc] border-y border-[#efe0dc]">
                            {order.products.map((item) => (
                                <OrderProduct key={item.productId._id} orderItem={item} />
                            ))}
                        </div>

                        <div className="mt-8 text-4xl">Total: {order.totalPrice} pln</div>

                        {order.status === "p" || order.status === "r" ? (
                            <button
                                className="rounded-2xl hover:bg-red-600 px-4 py-2 mt-6 text-3xl text-white transition-colors bg-red-500"
                                onClick={async () => {
                                    try {
                                        await api.patch(`/orders/${orderId}/cancel`);
                                        fetchOrder();
                                    } catch (err) {
                                        setError("Failed to cancel order");
                                    }
                                }}
                            >
                                Cancel Order
                            </button>
                        ) : null}

                        <Link to="/profile" className="mt-6">
                            <div className="text-3xl py-2 px-4 mt-4 rounded-2xl bg-[#efe0dc] text-[#171819] hover:bg-opacity-90 transition-opacity">
                                Back to profile
                            </div>
                        </Link>
                    </>
                )}
            </div>
            <div className="mt-30"></div>
        </div>
    );
};

export default OrderPage;
