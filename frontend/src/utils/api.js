import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 || error.response?.status === 403) {
            if (originalRequest.url === "/auth/refresh") {
                navigate("/login");
                return Promise.reject(error);
            }

            try {
                await api.post("/auth/refresh", {}, { withCredentials: true });
                return apiClient(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
