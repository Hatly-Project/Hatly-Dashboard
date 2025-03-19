import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hatly-api.onrender.com/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      config.data = {
        ...config.data,
        refreshToken: refreshToken,
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response;
  },
  async (error) => {
    console.error("Axios error:", error);
    if (error.config.url === "/auth/refresh") {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axiosInstance.post("/auth/refresh", {
            refreshToken: refreshToken,
            token: localStorage.getItem("accessToken"),
          });

          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axiosInstance.request(error.config);
          }
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Instead of navigating here, return an error so the component handles it
          return Promise.reject({ message: "Session expired", shouldRedirect: true });
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
