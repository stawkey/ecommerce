import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Product/Product";
import Footer from "../../components/Footer/Footer";
import api from "../../utils/api";

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get("q");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products`, {
                    params: { q: queryValue },
                });
                setProducts(response.data.products || []);
                setPagination(response.data.pagination);
                setError(null);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load products");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [queryValue]);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="flex flex-col items-center w-2/3 mt-8">
                    {loading && (
                        <div className="flex justify-center my-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-y-3 border-blue-500"></div>
                        </div>
                    )}

                    {error && <div className="text-red-500 my-4">{error}</div>}

                    {!loading && !error && (
                        <div className="flex flex-wrap justify-center">
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))
                            ) : (
                                <div className="text-lg">No products found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
