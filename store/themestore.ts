import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light', // Initial fallback state

      setTheme: (theme) => {
        set({ theme });
        // Update DOM classes immediately upon explicit sets
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          if (theme === 'dark') {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },

      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(nextTheme);
      },
    }),
    {
      name: 'theme-storage', // Key name in localStorage
    }
  )
);