import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://hatly-api.onrender.com",
    headers:{
        "Content-Type":"application/json",
    }
})

export default axiosInstance;