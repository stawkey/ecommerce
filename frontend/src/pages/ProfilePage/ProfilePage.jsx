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

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await api.get("/auth/getUserProfile", { withCredentials: true });
            setUserProfile(response.data);
        };
        fetchProfile();
    }, []);

    if (!userProfile) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Navbar />
            <div>
                <div className={styles.profileHeader}>
                    <div className={styles.userInfo}>
                        <h2>{userProfile.firstName}</h2>
                        <h3>{userProfile.lastName}</h3>
                    </div>
                    <Link to="/">
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
