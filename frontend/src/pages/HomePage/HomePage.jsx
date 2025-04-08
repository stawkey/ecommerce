import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";

const HomePage = () => {
    const scrollToCategories = () => {
        const categories = document.getElementById("categoriesHeader");
        categories.scrollIntoView({ behavior: "smooth" });
    };

    const categories = [
        {
            id: 1,
            name: "Headphones",
            img: "/images/headphones.jpeg",
        },
        {
            id: 2,
            name: "Keyboards",
            img: "/images/keyboard.jpg",
        },
        {
            id: 3,
            name: "Mice",
            img: "/images/mouse.png",
        },
        {
            id: 4,
            name: "Microphones",
            img: "/images/microphone.png",
        },
    ];

    const featuredProducts = [
        {
            id: 1,
            title: "Every move matters",
            subtitle: "Some random text, no idea what to write here",
            img: "/images/mouse.png",
            color: "#414932",
            link: "/products/1",
        },
        {
            id: 2,
            title: "A title",
            subtitle: "Still have no idea what I should put here",
            img: "/images/headphones.jpeg",
            color: "#51311b",
            link: "/products/2",
        },
    ];

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
                        <button
                            onClick={scrollToCategories}
                            className="hover:bg-purple-700 hover:scale-110 px-8 py-2 text-xl font-bold text-white transition-all duration-300 ease-in-out bg-purple-600 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div>
            </div>
            {featuredProducts.map((product, index) => (
                <FeaturedProduct key={product.id} product={product} reverse={index % 2 !== 0} />
            ))}
            <div id="categoriesHeader" className="pt-30 text-center">
                <h2 className="text-4xl font-bold text-[#e2e0dc]">Discover our products</h2>
            </div>
            <div className="max-w-4/5 container px-6 mx-auto my-10">
                <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center grid grid-cols-1 gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
