import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/auth/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            setMessage(response.data.message);

            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={styles.loginWrapper}>
            {showMessage && <div className={styles.messageBox}>{message}</div>}
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>
                </form>
                <Link to="/register">Don't have an account yet?</Link>
            </div>
        </div>
    );
};

export default Login;
