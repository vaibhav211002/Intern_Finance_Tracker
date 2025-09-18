import axios from "axios";
 
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ft_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
