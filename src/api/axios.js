import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from './cookies';
import { toast } from 'sonner';

export const getBaseUrl = () => {
  // Use VITE_API_URL from environment variables (e.g. on Netlify)
  let url = import.meta.env.VITE_API_URL;
  const localhostUrl = "http://localhost:8000/";
  
  // Check if window is defined (client-side) before accessing location
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  
  // Fallback to default if no env variable
  if (!url) {
    url = isLocalhost ? localhostUrl : "https://logic-church-api.onrender.com/";
  }

  // Ensure trailing slash
  if (!url.endsWith('/')) url += '/';
  
  return url;
};

// For static image matching
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith('http')) return path;
  
  const base = getBaseUrl();
  // Backend now mounts at /uploads
  // Path from backend is /uploads/file.jpg
  // So we just need the domain part of getBaseUrl
  const domain = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
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
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
