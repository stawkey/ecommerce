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
                {/* <div
                    className={styles.categoriesWrapper}
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    {showCategories && <div className={styles.overlay}></div>}
                    <div className={styles.categoriesBtn}>
                        <FontAwesomeIcon icon={faBars} />
                        {showCategories && (
                            <div className={styles.categoriesMenu}>
                                <ul>
                                    <Link to="/search">
                                        <li>All products</li>
                                    </Link>
                                    <Link to="/search?q=men's clothing">
                                        <li>Men's clothing</li>
                                    </Link>
                                    <Link to="/search?q=jewelery">
                                        <li>Jewelery</li>
                                    </Link>
                                    <Link to="/search?q=electronics">
                                        <li>Electronics</li>
                                    </Link>
                                    <Link to="/search?q=women's clothing">
                                        <li>Women's clothing</li>
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>
                </div> */}
                <div className={styles.logo}>
                    <Link to="/">Leyndell</Link>
                </div>
            </div>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* <button type="submit" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button> */}
            </div>
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
