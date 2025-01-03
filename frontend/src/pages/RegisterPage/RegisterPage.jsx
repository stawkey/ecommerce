import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await api.post(
            "/auth/register",
            {
                firstName,
                lastName,
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        setMessage(response.data.message);

        if (response.status === 201) {
            navigate("/login");
        }

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <Navbar />
            <div className={styles.loginWrapper}>
                {showMessage && <div className={styles.messageBox}>{message}</div>}
                <div className={styles.loginContainer}>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputLabel}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputLabel}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputLabel}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputLabel}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.passwordInputWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className={styles.showPasswordBtn}
                                >
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit">Register</button>
                    </form>
                    <Link to="/login">Already have an account?</Link>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
