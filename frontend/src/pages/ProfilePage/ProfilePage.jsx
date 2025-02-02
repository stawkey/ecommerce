import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const handleLogout = () => {
    api.post("/auth/logout", {}, {});
};

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileAndOrders = async () => {
            try {
                const [profileResponse, ordersResponse] = await Promise.all([
                    api.get("/auth/getUserProfile", { withCredentials: true }),
                    api.get("/orders/user", { withCredentials: true }),
                ]);
                setUserProfile(profileResponse.data);
                setOrders(ordersResponse.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchProfileAndOrders();
    }, []);

    if (loading) {
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
                    <Link to="/">
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            Logout
                        </button>
                    </Link>
                </div>
                <div className={styles.ordersContainer}>
                    <h2>Your orders:</h2>
                    {orders.map((order, index) => (
                        <div key={order._id} className={styles.orderBox}>
                            <h3>Order {index + 1}</h3>
                            <p>Total cost: ${order.totalCost.toFixed(2)}</p>
                            <Link to={`/orders/${order._id}`}>
                                <button className={styles.detailsButton}>Details</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
