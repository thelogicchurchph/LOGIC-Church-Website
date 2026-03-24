import axios from 'axios';
import { getCookie } from './cookies';
import { toast } from 'sonner';

export const backendUrl = () => {
  // Use VITE_API_URL from environment variables (e.g. on Netlify)
  const envUrl = import.meta.env.VITE_API_URL;
  const localhostUrl = "http://localhost:8000/logic";
  
  // Check if window is defined (client-side) before accessing location
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  
  if (envUrl) return envUrl;
  return isLocalhost ? localhostUrl : "https://logic-church-api.onrender.com/logic";
};

const api = axios.create({
  baseURL: backendUrl(),
  timeout: 30000, // Increased to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    // Do Add auth token
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      // toast.error(error.response.data?.error);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      // toast.error("Network Error");
    } else {
      console.error('Error:', error.message);
      // toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
