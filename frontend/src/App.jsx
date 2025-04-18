import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import globalRouter from "./utils/globalRouter";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

const App = () => (
    <BrowserRouter>
        <SetupGlobalNavigate />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/" element={<CheckoutPage />} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>
);

const SetupGlobalNavigate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        globalRouter.navigate = navigate;
    }, [navigate]);

    return null;
};

export default App;
