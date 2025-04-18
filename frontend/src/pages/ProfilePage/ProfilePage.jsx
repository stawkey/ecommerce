import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorBox from "../../components/ErrorBox/ErrorBox";

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

    return <span className={`${color} px-3 py-1 rounded-full text-sm font-medium`}>{text}</span>;
};

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchProfileAndOrders = async () => {
            try {
                const profileResponse = await api.get("/auth/getUserProfile", {
                    withCredentials: true,
                });
                setUserProfile(profileResponse.data);

                const ordersResponse = await api.get("/orders", { withCredentials: true });
                setOrders(ordersResponse.data.orders || []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Could not load profile. Please try logging in again.");

                if (err.response?.status === 401) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndOrders();
    }, [navigate]);

    if (error) {
        return (
            <div>
                <div className="flex flex-col items-center mt-8 p-6 bg-[#efe0dc] rounded-lg max-w-lg mx-auto">
                    <h2 className="mb-4 text-2xl font-bold">Error</h2>
                    <p className="mb-6 text-center">{error}</p>
                    <button
                        className="px-6 py-3 bg-[#d9534f] text-white rounded-lg hover:bg-opacity-90 transition-opacity"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading || !userProfile) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {loading && <LoadingSpinner />}
            {error && <ErrorBox error={error} setError={setError} />}
            <div className="flex flex-col items-center px-4 py-8">
                <div className="flex items-center justify-between w-full max-w-2xl pb-3 my-4">
                    <div className="flex flex-col">
                        <h2 className="m-0 text-2xl font-bold">
                            {userProfile.firstName} {userProfile.lastName}
                        </h2>
                        <h3 className="mt-1 text-base text-gray-400">{userProfile.email}</h3>
                    </div>
                    <button
                        className="px-4 py-3 bg-red-500 text-[#efe0dc] rounded-lg hover:cursor-pointer hover:bg-red-600 transition-colors"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <div className="w-full max-w-2xl py-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Your Orders</h2>
                    </div>

                    {orders.length === 0 ? (
                        <p className="py-4 text-center">You haven't placed any orders yet.</p>
                    ) : (
                        <div className="border-y w-full divide-y">
                            {orders.slice(0, 3).map((order) => (
                                <div
                                    key={order._id}
                                    className="flex items-center justify-between py-4"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-medium">
                                                Order #{order._id.substring(order._id.length - 6)}
                                            </h3>
                                            <OrderStatusBadge status={order.status} />
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Placed on: {formatDate(order.createdAt)}
                                        </p>
                                        <p className="font-medium">Total: {order.totalPrice} pln</p>
                                    </div>
                                    <Link to={`/orders/${order._id}`}>
                                        <button className="hover:bg-[#d0c0bc] hover:cursor-pointer px-4 py-2 text-[#171819] transition-colors bg-[#efe0dc] rounded-lg">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            ))}

                            {orders.length > 3 && (
                                <div className="py-4 text-center">
                                    <Link to="/orders">
                                        <button className="hover:text-blue-800 text-blue-600">
                                            See all {orders.length} orders
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-30"></div>
        </div>
    );
};

export default ProfilePage;
