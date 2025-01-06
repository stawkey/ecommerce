import React from "react";
import styles from "./ProfilePage.module.css";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";

const get = () => {
    api.get("/orders/order-history");
};

const handleLogout = () => {
    api.post("/auth/logout", {}, {});
};

const ProfilePage = () => {
    return (
        <>
            <Navbar />
            <div>
                <div className={styles.profileHeader}>
                    <div className={styles.userInfo}>
                        <h2>John Doe</h2>
                        <p>johndoe@example.com</p>
                    </div>
                    <Link to="/">
                        <button class={styles.logoutBtn} onClick={handleLogout}>
                            Logout
                        </button>
                    </Link>
                </div>

                {get()}
            </div>
        </>
    );
};

export default ProfilePage;
