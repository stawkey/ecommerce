import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Product/Product";
import Footer from "../../components/Footer/Footer";

const SearchPage = () => {
    const products = [
        {
            id: 1,
            name: "Fantastic headphones",
            price: 999.99,
            category: "Headphones",
            img: "/images/headphones.jpeg",
        },
        {
            id: 2,
            name: "Fantastic keyboard",
            price: 1234,
            category: "Keyboards",
            img: "/images/keyboard.jpg",
        },
        {
            id: 3,
            name: "Fantastic mouse",
            price: 11111,
            category: "Mice",
            img: "/images/mouse.png",
        },
        {
            id: 4,
            name: "Fantastic microphone",
            price: 0.1,
            category: "Microphones",
            img: "/images/microphone.png",
        },
        {
            id: 1,
            name: "Fantastic headphones",
            price: 999.99,
            category: "Headphones",
            img: "/images/headphones.jpeg",
        },
        {
            id: 2,
            name: "Fantastic keyboard",
            price: 1234,
            category: "Keyboards",
            img: "/images/keyboard.jpg",
        },
        {
            id: 3,
            name: "Fantastic mouse",
            price: 11111,
            category: "Mice",
            img: "/images/mouse.png",
        },
        {
            id: 4,
            name: "Fantastic microphone",
            price: 0.1,
            category: "Microphones",
            img: "/images/microphone.png",
        },
        {
            id: 1,
            name: "Fantastic headphones",
            price: 999.99,
            category: "Headphones",
            img: "/images/headphones.jpeg",
        },
        {
            id: 2,
            name: "Fantastic keyboard",
            price: 1234,
            category: "Keyboards",
            img: "/images/keyboard.jpg",
        },
        {
            id: 3,
            name: "Fantastic mouse",
            price: 11111,
            category: "Mice",
            img: "/images/mouse.png",
        },
        {
            id: 4,
            name: "Fantastic microphone",
            price: 0.1,
            category: "Microphones",
            img: "/images/microphone.png",
        },
        {
            id: 1,
            name: "Fantastic headphones",
            price: 999.99,
            category: "Headphones",
            img: "/images/headphones.jpeg",
        },
        {
            id: 2,
            name: "Fantastic keyboard",
            price: 1234,
            category: "Keyboards",
            img: "/images/keyboard.jpg",
        },
        {
            id: 3,
            name: "Fantastic mouse",
            price: 11111,
            category: "Mice",
            img: "/images/mouse.png",
        },
        {
            id: 4,
            name: "Fantastic microphone",
            price: 0.1,
            category: "Microphones",
            img: "/images/microphone.png",
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="flex flex-col items-center w-2/3 mt-8">
                    <h2 className="pb-5 text-4xl">Results for asdfghjkl</h2>
                    <div className="flex flex-wrap justify-center">
                        {products.map((product) => (
                            <Product product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
