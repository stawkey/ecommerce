import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    const currentYear = new Date();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Message:", message);
    };

    return (
        <div className={style.footerContainer}>
            <div className={style.contact}>
                <h2>Contact us!</h2>
                <form onSubmit={handleSubmit} className={style.formContainer}>
                    <h4>Email:</h4>
                    <input
                        placeholder="mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.inputField}
                        type="email"
                    />
                    <h4>Message:</h4>
                    <input
                        placeholder="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={style.inputField}
                        type="text"
                    />
                    <button type="submit" className={style.submitButton}>
                        Submit
                    </button>
                </form>
            </div>
            <div className={style.copyright}>
                <h2>
                    Copyright <FontAwesomeIcon icon={faCopyright} className={style.copyrightIcon} />{" "}
                    Leyndell {currentYear.getFullYear()}{" "}
                </h2>
            </div>
        </div>
    );
};

export default Footer;
