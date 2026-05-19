import { useAuthStore } from '@/store/authstore';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';


const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Outbound Request Interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        
        const token = useAuthStore.getState().token;;
        
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Inbound Response Interceptor
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('🔒 Session invalid or expired.');
            // Clear your auth store state here on expiration:
            useAuthStore.getState().clearAuth();
        }
        return Promise.reject(error);
    }
);

export default axiosClient;