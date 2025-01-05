// TODO: font, maybe something on the bottom of the side, sliding products and/or image, minmaxing looks, probably some scaling

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import style from "./HomePage.module.css";
import HomePageImage from "../../components/HomePageImage/HomePageImage";
import ProductsHighlights from "../../components/ProductsHighlights/ProductsHighlights";
const HomePage = () => {
    return (
        <div>
            <Navbar />
            {/* <div className={style.imageContainer}>
                <img 
                src="https://media.tenor.com/HmFcGkSu58QAAAAM/silly.gif"
                className={style.betaImage}
                />
            </div> */}
            <HomePageImage />
            <h1>Check our bestsellers:</h1>
            <div className={style.bestsellersBox}>
                <div className={style.highlights}>
                <ProductsHighlights />
                </div>
            </div>
            <h1>New things in stock:</h1>
            <div className={style.newThingsBox}>
                <div className={style.highlights}>
                <ProductsHighlights />
                </div>
            </div>
            <h2>Contact, footer, anything? tbd</h2>
        </div>
    )

};

export default HomePage;
