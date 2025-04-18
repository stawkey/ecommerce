import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.post(
                "/auth/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            setError(response.data.message);

            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <Navbar />
            <div className={styles.loginWrapper}>
                {loading && <LoadingSpinner />}
                {error && <ErrorBox error={error} setError={setError} />}
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
        </>
    );
};

export default LoginPage;
