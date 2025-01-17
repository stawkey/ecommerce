import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./SearchPage.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState({});
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (query) {
            const filtered = products.filter(
                (product) =>
                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                    product.category.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [query, products]);

    const handleImageLoad = (id) => {
        setImagesLoading((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div>
            <Navbar />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className={styles.searchWrapper}>
                    <h1>{query ? `Search results for "${query}"` : "All products"}</h1>

                    <div className={styles.searchResults}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <Link to={`/product/${product.id}`}>
                                    {!imagesLoading[product.id] && <LoadingSpinner />}
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        onLoad={() => handleImageLoad(product.id)}
                                        style={{
                                            display: imagesLoading[product.id] ? "block" : "none",
                                        }}
                                    />
                                    <h3>{product.title}</h3>
                                    <div className={styles.detailsWrapper}>
                                        <p className={styles.price}>${product.price}</p>
                                        <div className={styles.rating}>
                                            <span>⭐ {product.rating.rate} </span>
                                            <span>({product.rating.count})</span>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noResults}>No products found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
