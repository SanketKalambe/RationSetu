import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api'),
  withCredentials: true
});

// Request Interceptor: Attach JWT Token with backward-compatible key resolution
API.interceptors.request.use(
  (config) => {
    const token = 
      localStorage.getItem('rationsetu_token') || 
      localStorage.getItem('smart_pds_token') || 
      localStorage.getItem('token');
      
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling & Safe Session Recovery
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage keys
      localStorage.removeItem('rationsetu_token');
      localStorage.removeItem('rationsetu_user');
      localStorage.removeItem('smart_pds_token');
      localStorage.removeItem('smart_pds_user');

      // If user receives a 401 on an authenticated page, redirect to login cleanly
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login') && window.location.pathname !== '/') {
        setTimeout(() => {
          if (!localStorage.getItem('rationsetu_token') && !localStorage.getItem('smart_pds_token')) {
            window.location.href = '/login?expired=true';
          }
        }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
