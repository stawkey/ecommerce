import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        zipCode: "",
        country: "",
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.get("/cart");
                setCart(response.data);
            } catch (err) {
                console.error("Error fetching cart:", err);
                setError("Failed to load your cart. Please try again.");
            }
        };

        fetchCart();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        for (const field in formData) {
            if (!formData[field].trim()) {
                setError(`Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
                return false;
            }
        }
        return true;
    };

    const order = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const shippingInfo = {
                name: `${formData.firstName} ${formData.lastName}`,
                address: formData.street,
                city: formData.city,
                postalCode: formData.zipCode,
                country: formData.country,
            };

            const paymentInfo = {
                method: "credit_card",
                status: "completed",
                transactionId: "placeholder-" + Date.now(),
            };

            const response = await api.post("/orders", {
                shippingInfo,
                paymentInfo,
            });

            navigate("/");
        } catch (err) {
            console.error("Error creating order:", err);
            setError(
                err.response?.data?.message || "Failed to create your order. Please try again."
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center m-8">
            {loading && <LoadingSpinner />}
            <h2 className="mb-8 text-4xl font-semibold">Check out</h2>
            {error && <ErrorBox error={error} setError={setError} />}
            <div className="w-1/2 mt-8 mb-12">
                <h3 className="text-2xl font-medium mb-4 pb-2 border-b border-[#efe0dc]">
                    Order summary
                </h3>
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>{cart?.totalPrice || "XXX.XX"} pln</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-semibold mt-4 pt-2 border-t border-[#efe0dc]">
                    <span>Total cost</span>
                    <span>{cart ? cart.totalPrice : "XXX.XX"} pln</span>
                </div>
            </div>
            <form className="w-1/2" onSubmit={order}>
                <h3 className="text-2xl font-medium mb-6 pb-2 border-b border-[#efe0dc]">
                    Shipping address
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="mb-2 text-sm font-medium">
                            First name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-3 border border-[#efe0dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#efe0dc]"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="mb-2 text-sm font-medium">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-3 border border-[#efe0dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#efe0dc]"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <label htmlFor="street" className="mb-2 text-sm font-medium">
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="p-3 border border-[#efe0dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#efe0dc]"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label htmlFor="city" className="mb-2 text-sm font-medium">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="p-3 border border-[#efe0dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#efe0dc]"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="zipCode" className="mb-2 text-sm font-medium">
                            Zip code
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="p-3 border border-[#efe0dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#efe0dc]"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col mb-8">
                    <label htmlFor="country" className="mb-2 text-sm font-medium">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="p-3 border border-[#efe0dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#efe0dc]"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`text-2xl py-3 px-5 mb-12 rounded-2xl bg-[#efe0dc] text-[#171819] hover:cursor-pointer ${
                            loading ? "opacity-70" : "hover:bg-white"
                        }`}
                    >
                        {loading ? "Processing..." : "Complete order"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
