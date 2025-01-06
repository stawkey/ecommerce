import axios from "axios";
import globalRouter from "../utils/globalRouter";

const api = axios.create({
    baseURL: "/api",
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status == 401 && globalRouter.navigate) {
            globalRouter.navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
