import axios from 'axios';
import { getCookie } from './cookies';
import { toast } from 'sonner';

export const getBaseUrl = () => {
  // Use VITE_API_URL from environment variables (e.g. on Netlify)
  const envUrl = import.meta.env.VITE_API_URL;
  const localhostUrl = "http://localhost:8000/logic/";
  
  // Check if window is defined (client-side) before accessing location
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  
  // Ensure trailing slash
  let url = envUrl || (isLocalhost ? localhostUrl : "https://logic-church-api.onrender.com/logic/");
  if (!url.endsWith('/')) url += '/';
  return url;
};

// For static image matching
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith('http')) return path;
  const base = getBaseUrl().replace(/\/logic\/?$/, ''); // Remove /logic for static uploads mapping if needed, or keep it if backend mounts there
  // Based on backend: app.mount("/logic/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
  // So /logic/uploads/file.jpg is correct.
  return `${base.endsWith('/') ? base.slice(0, -1) : base}${path.startsWith('/') ? '' : '/'}${path}`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    // Standardize URL by removing leading slash to work with trailing-slash baseURL
    if (config.url && config.url.startsWith('/')) {
      config.url = config.url.substring(1);
    }

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
