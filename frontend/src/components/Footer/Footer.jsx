import React from 'react';
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
                <h3>Insert random bullshit here</h3>
                <h4>Here too, if you want</h4>
            </div>
            <div className={style.contact}>
                <input placeholder='wpisz no co'></input>
                <h2>Click <a href='/cart'>HERE</a> if you want to contact with us!</h2>
                <h4>Wpisz no maila:</h4>
                <input placeholder='tu o mail'></input>
                <h4>I jeszcze treść wiadomości, jeśli łaska</h4>
                <input placeholder='właśnie tutaj'></input>
            </div>

        </div>
    );
};

export default Footer;