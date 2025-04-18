import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../components/Product/Product";
import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorBox from "../../components/ErrorBox/ErrorBox";

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get("q");
    const pageValue = searchParams.get("page") || "1";
    const pageLimit = searchParams.get("limit") || "30";
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products`, {
                    params: {
                        q: queryValue,
                        page: pageValue,
                        limit: pageLimit,
                    },
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
    }, [queryValue, pageValue]);

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex flex-col items-center w-2/3 mt-8">
                    {loading && <LoadingSpinner />}

                    {error && <ErrorBox error={error} setError={setError} />}

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

                    {!loading && !error && pagination && <Pagination pagination={pagination} />}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
