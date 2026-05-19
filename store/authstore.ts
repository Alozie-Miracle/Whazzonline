import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfile } from '../types';

interface AuthState {
  user: { id: string; email: string } | null;
  profile: UserProfile | null;
  token: string | null;
  
  // Actions to manage state
  setAuth: (profile: UserProfile | null) => void;
  clearAuth: () => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      token: null,

      setAuth: (profile) => 
        set(() => ({
          profile,
          user: profile ? { id: profile.id, email: profile.email } : null,
        })),

      clearAuth: () => set({ user: null, profile: null, token: null }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'whazzonline-auth-storage', // Unique key name for the localStorage item
      storage: createJSONStorage(() => localStorage), // Explicitly uses browser localStorage
    }
  )
);