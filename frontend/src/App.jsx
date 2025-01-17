import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProductPage from "./pages/ProductPage/ProductPage"
import Cart from "./pages/Cart/Cart";
import SuccessfulOrderPage from "./pages/SuccessfulOrderPage/SuccessfulOrderPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import globalRouter from "./utils/globalRouter";
import { CartProvider } from "./contexts/CartContext";

const App = () => (
    <CartProvider>
        <BrowserRouter>
            <SetupGlobalNavigate />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success"
                    element={
                        <ProtectedRoute>
                            <SuccessfulOrderPage />
                        </ProtectedRoute>} />
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
    </CartProvider>
);

const SetupGlobalNavigate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        globalRouter.navigate = navigate;
    }, [navigate]);

    return null;
};

export default App;
