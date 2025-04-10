import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import api from "../../utils/api";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [arrowVisible, setArrowVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    api.get("/categories"),
                    api.get("/featured-products"),
                ]);

                setCategories(categoriesResponse.data);
                setFeaturedProducts(productsResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const scrollToCategories = () => {
        const categoriesHeader = document.getElementById("categoriesHeader");
        categoriesHeader.scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos < 10) {
            setArrowVisible(true);
        } else {
            setArrowVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div className="flex flex-col min-h-screen overflow-hidden">
                <Navbar />
                <div className="relative flex items-center justify-center flex-1">
                    <img
                        className="absolute object-cover w-full h-full"
                        src="/images/main.png"
                        alt="Gaming background"
                    />
                    <div className="relative px-4 text-center">
                        <h1 className="md:text-7xl mb-6 text-4xl font-bold text-white">
                            Where precision meets perfection
                        </h1>
                        <p className="md:text-2xl mb-8 text-xl text-gray-200">
                            High-performance gear for gamers and professionals
                        </p>
                    </div>
                    <button
                        onClick={scrollToCategories}
                        className={`text-2xl rounded-lg py-2 px-4 mt-8 animate-bounce absolute bottom-0 transition-opacity ease-in-out duration-500 hover:cursor-pointer ${
                            arrowVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                </div>
            </div>
            {featuredProducts.map((product, index) => (
                <FeaturedProduct key={product._id} product={product} reverse={index % 2 !== 0} />
            ))}
            <div id="categoriesHeader" className="pt-30 text-center">
                <h2 className="text-4xl font-bold text-[#e2e0dc]">Discover our products</h2>
            </div>
            <div className="max-w-4/5 container px-6 mx-auto my-10">
                <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center grid grid-cols-1 gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
