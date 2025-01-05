import React, { useState } from "react";
import style from "./HomePageImage.module.css";

const images = [
  "https://a.pinatafarm.com/940x529/254350840f/white-cat-da2c837628aa5a4d253f3956efa6244f-meme.jpeg",
  "https://media.tenor.com/HmFcGkSu58QAAAAM/silly.gif",
  "https://uploads.dailydot.com/2024/07/side-eye-cat.jpg?q=65&auto=format&w=1600&ar=2:1&fit=crop",
  
];

const HomePageImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    function handlingLeft() {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1)
    }

    function handlingRight() {
        setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1)
    }

  return (
    <div className={style.container}>
        <button className={style.leftArrow} onClick={handlingLeft}>
            &#11164;
        </button>
        <img
            src={images[currentIndex]}
            alt="meow"
            className={style.image}
        />
        <button className={style.rightArrow} onClick={handlingRight}>
            &#11166;
        </button>
    </div>
  );
};

export default HomePageImage;
