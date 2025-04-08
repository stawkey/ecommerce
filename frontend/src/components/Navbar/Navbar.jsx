import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCartShopping,
    faBars,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onSearch }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search${searchQuery.trim() ? `?q=${searchQuery}` : ""}`);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    <Link to="/">Leyndell</Link>
                </div>
            </div>
            <form onSubmit={handleSearch} className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
            <div className={styles.icons}>
                <Link to="/profile" className={styles.iconLink}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                </Link>
                <Link to="/cart" className={styles.iconLink}>
                    <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
