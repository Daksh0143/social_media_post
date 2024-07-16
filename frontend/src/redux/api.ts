import axios, { Axios, AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: false,
  headers: {
    "Content-Type": "Application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
