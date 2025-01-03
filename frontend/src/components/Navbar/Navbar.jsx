import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCartShopping,
    faBars,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        console.log(`Searching for ${searchQuery}`);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <div
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
                                    <li>Category 1</li>
                                    <li>Category 2</li>
                                    <li>Category 3</li>
                                    <li>Category 4</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <Link to="/" className={styles.logo}>
                    Leyndell
                </Link>
            </div>
            <div className={styles.searchBar}>
                <input type="text" placeholder="What are you looking for?" />
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className={styles.icons}>
                <Link to="/login">
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                </Link>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
