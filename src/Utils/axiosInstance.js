import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://hatly-api.onrender.com",
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = Bearer `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.code === "ERR_NETWORK") {
            return Promise.reject(error.message);
        }
        if (error.response.status === 401 && error.response.data.message === "Token Expired") {
            const response = await axiosInstance.get("/auth/refreshToken");
            if (response.status === 200) {
                console.log(response.data);

                localStorage.setItem("token", response.data.token);
                error.config.headers.Authorization = Bearer `${response.data.token}`;
                return axiosInstance.request(error.config);
            }
            // return Promise.reject(error.response.data.message);

        }
        return Promise.reject(error);
    },
);
export default axiosInstance;