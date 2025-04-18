import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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

    useEffect(() => {
        const fetchProfileAndOrders = async () => {
            try {
                const profileResponse = await api.get("/auth/getUserProfile", {
                    withCredentials: true,
                });
                setUserProfile(profileResponse.data);

                const ordersResponse = await api.get("/order", { withCredentials: true });
                setOrders(ordersResponse.data);
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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className={styles.errorContainer}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button className={styles.logoutBtn} onClick={() => navigate("/login")}>
                        Go to Login
                    </button>
                </div>
            </>
        );
    }

    if (!userProfile) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Navbar />
            <div>
                <div className={styles.profileHeader}>
                    <div className={styles.userInfo}>
                        <h2>
                            {userProfile.firstName} {userProfile.lastName}
                        </h2>
                        <h3>{userProfile.email}</h3>
                    </div>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className={styles.ordersContainer}>
                    <h2>Your orders:</h2>
                    {orders.length === 0 ? (
                        <p>You haven't placed any orders yet.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div key={order._id} className={styles.orderBox}>
                                <h3>Order {index + 1}</h3>
                                <p>Total cost: ${order.totalCost.toFixed(2)}</p>
                                <Link to={`/orders/${order._id}`}>
                                    <button className={styles.detailsButton}>Details</button>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
