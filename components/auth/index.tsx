'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useThemeStore } from '@/store/themestore';
import { useAuth } from '@/hooks/useAuth';



export default function Auth() {
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const { login, register, error, loading: isLoading } = useAuth()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const response = await login(email, password);
      if (!response.success) {
        // Handle login error if needed, error state is already set in the hook
        return;
      }
    } else {
      const response = await register(email, password, displayName);
      if (!response.success) {
        // Handle registration error if needed, error state is already set in the hook
        return;
      }
    }
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