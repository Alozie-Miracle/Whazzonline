import { useState } from 'react';
import axiosClient from '@/utils/axiosClient';
import { UserProfile } from '@/types';
import { useAuthStore } from '@/store/authstore';
import { useRouter } from 'next/navigation';


export interface AuthApiResponse {
    success: boolean;
    message: string;
    token?: string;
    user: UserProfile;
}

export interface HookActionResponse {
    success: boolean;
    message?: string;
}


export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { setToken, clearAuth, setAuth, user } = useAuthStore();

    const clearError = (): void => setError(null);
    let redirectPath = "/";
    if (typeof window !== 'undefined') {
        // Safe to use window, document, localStorage, or location here
        redirectPath = new URLSearchParams(window.location.search).get('redirect') || '/';
    }
    const router = useRouter();

    const login = async (email: string, password: string): Promise<HookActionResponse> => {
        if (!email || !password) {
            const errorMsg = 'Email and password are required.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        }
        setLoading(true);
        clearError();
        try {
            // Enforce strict Type compilation on the Axios post response mapping
            const response = await axiosClient.post<AuthApiResponse>('/auth/login', { email, password });
            const { user: userData, token } = response.data;

            if (token) {
                // Save token to store here: useAuthStore.getState().setToken(token);
                useAuthStore.getState().setToken(token);
            }
            useAuthStore.getState().setAuth(userData);
            if (redirectPath) {
                router.push(redirectPath);
                return { success: true };
            }
            router.push('/')
            return { success: true };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Invalid authentication credentials.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string, displayName: string): Promise<HookActionResponse> => {
        if (!email || !password || !displayName) {
            const errorMsg = 'Email, password, and display name are required.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        }
        setLoading(true);
        clearError();
        try {
            const response = await axiosClient.post<AuthApiResponse>('/auth/register', { email, password, name: displayName });
            const { user: userData, token } = response.data;
            if (token) {

                useAuthStore.getState().setToken(token);
            }
            useAuthStore.getState().setAuth(userData);
            if (redirectPath) {
                router.push(redirectPath);
                return { success: true };
            }
            router.push('/')
            return { success: true };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }   
    };

    const logout = (): void => {
        useAuthStore.getState().clearAuth();
    };

    return {
        user,
        loading,
        error,
        login,
        logout,
        clearError,
        register,
        isAuthenticated: !!user,
    };
};