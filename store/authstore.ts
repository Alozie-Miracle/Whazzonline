import { create } from 'zustand';
import { UserProfile } from '../types';

interface AuthState {
  user: { id: string; email: string } | null;
  profile: UserProfile | null;
  
  // Actions to manage state
  setAuth: (profile: UserProfile | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,

  setAuth: (profile) => 
    set(() => ({
      profile,
      user: profile ? { id: profile.id, email: profile.email } : null,
    })),


  clearAuth: () => set({ user: null, profile: null, }),
}));