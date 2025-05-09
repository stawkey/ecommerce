import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import SpecificationTable from "../../components/SpecificationTable/SpecificationTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ProductPage = () => {
    const { id: productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const specRef = useRef(null);
    const [arrowVisible, setArrowVisible] = useState(true);
    const [cartNotification, setCartNotification] = useState({
        visible: false,
        message: "",
    });

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [productId]);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos < 10) {
            setArrowVisible(true);
        } else {
            setArrowVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSpecs = () => {
        specRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const showNotification = (message) => {
        setCartNotification({
            visible: true,
            message,
        });

        setTimeout(() => {
            setCartNotification({
                visible: false,
                message: "",
            });
        }, 3000);
    };

    const addToCart = async () => {
        try {
            setLoading(true);
            const response = await api.post("/cart/products", { productId, quantity: 1 });
            showNotification("Product added to cart");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {loading && <LoadingSpinner />}
            {cartNotification.visible && (
                <div className="fixed top-20 right-0 left-0 w-fit mx-auto bg-[#efe0dc] text-[#171819] p-3 rounded-lg z-1000 flex items-center gap-2 transition-all duration-300">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                    <span>{cartNotification.message}</span>
                </div>
            )}
            {error || !product ? (
                <ErrorBox error={error} setError={setError} />
            ) : (
                <div className="md:px-0 flex flex-col min-h-screen px-5">
                    <div className="md:flex-row flex flex-col justify-center gap-8 my-auto">
                        <div className="md:w-1/3 md:mt-0 flex justify-center mt-8">
                            <img
                                src="/images/headphones.jpeg"
                                className="max-w-4/5 object-contain rounded-lg"
                                alt="Product"
                            />
                        </div>
                        <div className="md:w-1/3 flex flex-col justify-center">
                            <h2 className="py-2 text-4xl font-bold">{product.name}</h2>
                            <h3 className="text-2xl">{product.price} pln</h3>
                            <p className="md:max-h-40 md:overflow-y-scroll mt-5">
                                {product.description}
                            </p>
                            <button
                                onClick={addToCart}
                                className="bg-[#efe0dc] text-2xl text-black rounded-lg py-2 px-4 hover:bg-[#a4a4a4] mt-8 w-fit mx-auto md:mx-0"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={scrollToSpecs}
                            className={`text-xl rounded-lg py-2 px-4 mt-8 animate-bounce absolute bottom-0 transition-opacity ease-in-out duration-500 hover:cursor-pointer ${
                                arrowVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        >
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>
            )}
            <div className="mb-30">
                <SpecificationTable ref={specRef} />
            </div>
        </div>
    );
};

export default ProductPage;
