import axios from "axios";
import { useHistory } from "react-router-dom"; // Assuming you are using react-router-dom for navigation

const axiosInstance = axios.create({
  baseURL: "https://hatly-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows cookies to be sent with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token && refreshToken) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Cookie"] = `refreshToken=${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const cookies = response.headers["set-cookie"];
    if (!cookies) {
      return response;
    }
    const refreshTokenList = cookies[0].split(";");
    const refreshToken = refreshTokenList[0].split("=")[1];
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    return response;
  },
  async (error) => {
    if (error.config.url === "/auth/refresh") {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      if (refreshToken && accessToken) {
        try {
          const response = await axiosInstance.post("/auth/refresh", {
            token: accessToken,
          });
          if (response.status === 200) {
            console.log(response.data);

            localStorage.setItem("accessToken", response.data.token);
            // Update the refreshToken in cookies
            error.config.headers.Authorization = `Bearer ${response.data.token}`;
            return axiosInstance.request(error.config);
          }
        } catch (refreshError) {
          // Handle refresh token error
          console.error("Refresh token error:", refreshError);
          // Show error dialog or navigate to login
          alert("Session expired. Please log in again.");
          const history = useHistory();
          history.push("/login");
          return Promise.reject(refreshError);
        }
      }
      // return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
