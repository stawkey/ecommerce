import React from 'react';
import { Link } from 'react-router-dom'
import style from './Footer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopyright
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    const currentYear = new Date();
    return (
        <div className={style.footerContainer}>
            <div className={style.copyright}>
                <h2>Copyright <FontAwesomeIcon icon={faCopyright} className={style.copyrightIcon} /> Leyndell {currentYear.getFullYear()} </h2>
            </div>
            <div className={style.middleText}>
                <h2>CATEGORIES</h2>
                <ul>
                    <Link to="/search?q=men's clothing">
                        <li>Men's clothing</li>
                    </Link>
                    <Link to="/search?q=jewelery">
                        <li>Jewelery</li>
                    </Link>
                    <Link to="/search?q=electronics">
                        <li>Electronics</li>
                    </Link>
                    <Link to="/search?q=women's clothing">
                        <li>Women's clothing</li>
                    </Link>
                </ul>
            </div>
            <div className={style.contact}>
                <h2>Click <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>HERE</a> if you want to contact with us!</h2>
                <h4>Wpisz no maila:</h4>
                <input placeholder='tu o mail'></input>
                <h4>I jeszcze treść wiadomości, jeśli łaska</h4>
                <input placeholder='właśnie tutaj'></input>
            </div>

        </div>
    );
};

export default Footer;