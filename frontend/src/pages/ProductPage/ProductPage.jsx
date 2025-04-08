import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import SpecificationTable from "../../components/SpecificationTable/SpecificationTable";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const specRef = useRef(null);
    const [arrowVisible, setArrowVisible] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
    }, [id]);

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
    });

    const scrollToSpecs = () => {
        specRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className="md:px-0 flex flex-col min-h-screen px-5">
                <Navbar />
                <div className="md:flex-row flex flex-col justify-center gap-8 my-auto">
                    <div className="md:w-1/3 md:mt-0 flex justify-center mt-8">
                        <img
                            src="/images/headphones.jpeg"
                            className="max-w-4/5 object-contain rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/3 flex flex-col justify-center">
                        <h2 className="py-2 text-4xl font-bold">Fantastic headphones</h2>
                        <h3 className="text-2xl">9999.99 pln</h3>
                        <p className="md:max-h-40 md:overflow-y-scroll mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            aliquet sodales sem, a efficitur ex pharetra ut. Pellentesque lacinia
                            placerat egestas. Sed a augue sem. Sed sit amet venenatis nunc, nec
                            hendrerit sapien. Aliquam fermentum mauris vitae suscipit aliquet.
                            Nullam mauris nisi, commodo eu viverra quis, venenatis id orci.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            aliquet sodales sem, a efficitur ex pharetra ut. Pellentesque lacinia
                            placerat egestas. Sed a augue sem. Sed sit amet venenatis nunc, nec
                            hendrerit sapien. Aliquam fermentum mauris vitae suscipit aliquet.
                            Nullam mauris nisi, commodo eu viverra quis, venenatis id orci. Nullam
                            eu condimentum dolor.
                        </p>
                        <button className="bg-[#efe0dc] text-2xl text-black rounded-lg py-2 px-4 hover:bg-[#a4a4a4] mt-8 w-fit mx-auto md:mx-0">
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

            <SpecificationTable ref={specRef} />

            <Footer />
        </div>
    );
};

export default ProductPage;
