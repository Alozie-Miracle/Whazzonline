import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light', // Default fallback

      setTheme: (theme) => {
        set({ theme });
        get().initializeTheme();
      },

      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: nextTheme });
        
        // Update the DOM class for Tailwind
        const root = window.document.documentElement;
        if (nextTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },

      initializeTheme: () => {
        if (typeof window === 'undefined') return;

        const root = window.document.documentElement;
        const savedTheme = get().theme;
        
        // Check if there's a saved theme, otherwise fallback to system preferences
        const isDark =
          savedTheme === 'dark' ||
          (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
          root.classList.add('dark');
          set({ theme: 'dark' });
        } else {
          root.classList.remove('dark');
          set({ theme: 'light' });
        }
      },
    }),
    {
      name: 'theme-storage', // Key name in localStorage
      // Prevent running hydration on the server during Next.js SSR
      skipHydration: true, 
    }
  )
);