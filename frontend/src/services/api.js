import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
});

// Attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Global response error handler
API.interceptors.response.use(
  (res) => res,
  (error) => {
    // If 401 Unauthorized and not on login/signup page, clear token
    if (error.response?.status === 401) {
      const publicPaths = ["/login", "/signup"];
      if (!publicPaths.includes(window.location.pathname)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
