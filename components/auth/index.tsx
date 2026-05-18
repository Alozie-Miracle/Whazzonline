'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Reverted to standard framer-motion path if needed, or update back to motion/react based on your lockfile
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authstore';
import { useThemeStore } from '@/store/themestore';



export default function Auth() {
  const router = useRouter();
  const { setAuth } = useAuthStore(); 
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const redirectPath = new URLSearchParams(window.location.search).get('redirect') || '/';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      try {
        const mockUser = {
          id: Math.random().toString(36).substring(7),
          email,
          displayName: displayName || email.split('@')[0],
          photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=UX&backgroundColor=1a1a1a&textColor=ffffff`,
          createdAt: Date.now(),
        };
        setAuth(mockUser);
        setIsLoading(false);
        if (redirectPath) {
          router.push(redirectPath);
          return;
        }
        router.push('/');
      } catch (err: any) {
        setError('Authentication simulation failed');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 'google_' + Math.random().toString(36).substring(7),
        email: 'google.user@example.com',
        displayName: 'Google User',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
        createdAt: Date.now(),
      };
      setAuth(mockUser);
      setIsLoading(false);

      if (redirectPath) {
        router.push(redirectPath);
        return;
      }
      router.push('/');
    }, 1000);
  };

  return (
    <div className={`min-h-[80vh] flex items-center justify-center p-4 ${
        isDark ? "bg-[#121212]" : "bg-[#FAF9F6]"
      } min-h-screen transition-colors duration-500`}>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full max-w-md border p-10 shadow-sm transition-colors duration-500 rounded-xl ${
          isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-white border-[#E5E5E1]'
        }`}
      >
        <div className="text-center mb-10">
          <div className={`text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Security / Access
          </div>
          <h1 className={`text-4xl font-serif italic leading-tight mb-2 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Whazzonline Identity Access
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 border border-red-100 bg-red-50 text-red-600 text-[10px] font-mono uppercase tracking-widest"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div className="space-y-1">
              <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-black'}`}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`w-full bg-transparent border-b py-2 text-[10px] font-medium uppercase tracking-widest focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-[#333333] focus:border-white text-white' 
                    : 'border-[#E5E5E1] focus:border-[#1A1A1A] text-black'
                }`}
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-black'}`}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-transparent border-b py-2 text-[10px] font-medium tracking-widest focus:outline-none transition-colors ${
                isDark 
                  ? 'border-[#333333] focus:border-white text-white' 
                  : 'border-[#E5E5E1] focus:border-[#1A1A1A] text-black'
              }`}
              required
            />
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-black'}`}>
              Secure Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border-b py-2 text-[10px] font-medium tracking-widest focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-[#333333] focus:border-white text-white' 
                    : 'border-[#E5E5E1] focus:border-[#1A1A1A] text-black'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 transition-colors ${
                  isDark ? 'hover:text-white' : 'hover:text-black'
                }`}
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 text-[10px] rounded-xl cursor-pointer hover:scale-105 active:scale-95 ease-in-out duration-200 font-bold uppercase tracking-[0.3em] transition-all disabled:opacity-50 flex items-center justify-center gap-4 ${
              isDark 
                ? 'bg-white text-[#1A1A1A] hover:bg-opacity-80' 
                : 'bg-[#1A1A1A] text-white hover:bg-opacity-90'
            }`}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
            <ArrowRight className="w-3 h-3" />
          </button>
        </form>

        <div className="relative my-10 flex items-center">
          <div className={`grow border-t ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}></div>
          <span className={`shrink mx-6 text-[10px] font-mono opacity-20 uppercase ${isDark ? 'text-white' : 'text-black'}`}>
            Authentication Layer
          </span>
          <div className={`grow border-t ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`w-full py-4 border flex items-center justify-center gap-3 transition-all disabled:opacity-50 rounded-xl ${
            isDark 
              ? 'border-[#333333] hover:bg-[#222222]' 
              : 'border-[#E5E5E1] hover:bg-gray-50'
          }`}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 grayscale" />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Continue with G-AUTH
          </span>
        </button>

        <div className={`mt-8 text-center text-[10px] uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>
          <span className="opacity-40">{isLogin ? "No identity yet?" : "Existing identity?"} </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold underline hover:opacity-60 transition-opacity cursor-pointer"
          >
            {isLogin ? "Register now" : "Sign in here"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}