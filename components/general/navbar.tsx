"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, User, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/store/cartstore';
import { useAuthStore } from "@/store/authstore";
import { useThemeStore } from "@/store/themestore";

interface NavbarProps {
  onCartOpen: () => void;
}

export const Navbar = ({ onCartOpen }: NavbarProps) => {
  const totalItems = useCartStore((state) => state.totalItems);
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const signOut = useAuthStore((state) => state.clearAuth);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Prevent background scrolling when mobile navigation drawer is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    setIsMenuOpen(false);
    signOut();
    router.push('/');
  };

  const isDark = theme === 'dark';

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-500 border-b ${
      isDark 
        ? 'bg-[#121212]/95 border-[#333333]' 
        : 'bg-[#FAF9F6]/90 border-[#E5E5E1]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center cursor-pointer">
            <span className={`text-xl sm:text-2xl font-serif font-black tracking-tighter uppercase transition-colors ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}>
              Whazzonline
              <span className={`text-[10px] sm:text-xs align-top ml-1 font-sans font-medium uppercase opacity-40 italic tracking-normal ${
                isDark ? 'text-white/60' : 'text-[#1A1A1A]'
              }`}>
                Foundation
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-all ${
              isDark ? 'text-white/80' : 'text-[#1A1A1A]'
            }`}>
              Collections
            </Link>
            {user && (
              <>
                <Link href="/wishlist" className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-all ${
                  isDark ? 'text-white/80' : 'text-[#1A1A1A]'
                }`}>
                  Wishlist
                </Link>
                <Link href="/dashboard" className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-all ${
                  isDark ? 'text-white/80' : 'text-[#1A1A1A]'
                }`}>
                  Dashboard
                </Link>
              </>
            )}
            {profile?.email === 'miracleoliver8@gmail.com' && (
              <Link href="/admin" className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-all ${
                isDark ? 'text-white/80' : 'text-[#1A1A1A]'
              }`}>
                Admin
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <button 
              onClick={toggleTheme}
              className={`p-2 text-gray-400 cursor-pointer transition-colors hidden sm:block ${
                isDark ? 'hover:text-white' : 'hover:text-[#1A1A1A]'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button 
              className={`px-3 py-1.5 cursor-pointer sm:px-4 sm:py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-opacity-90 relative ${
                isDark ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'
              }`}
              onClick={onCartOpen}
            >
              Cart ({totalItems})
            </button>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <button 
                  onClick={handleSignOut} 
                  className={`hidden sm:block text-[10px] font-bold uppercase tracking-widest hover:text-red-500 transition-colors ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  Sign Out
                </button>
                <Link href="/dashboard" className="hidden sm:block">
                  {profile?.photoURL ? (
                    <div className={`relative w-8 h-8 rounded-full overflow-hidden border ${
                      isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'
                    }`}>

                      <Image
                        src={profile.photoURL} 
                        alt="Avatar"
                        width={32}
                        height={32}
                        unoptimized // <-- Add this flag here
                      />
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      isDark ? 'bg-gray-800 border-[#333333]' : 'bg-gray-200 border-[#E5E5E1]'
                    }`}>
                      <User className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                  )}
                </Link>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className={`text-[10px] font-bold uppercase tracking-widest hover:opacity-60 hidden sm:block ${
                  isDark ? 'text-white' : 'text-[#1A1A1A]'
                }`}
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu toggle trigger */}
            <button 
              className={`md:hidden p-2 transition-colors text-gray-400 z-50 ${
                isDark ? 'hover:text-white' : 'hover:text-[#1A1A1A]'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Modernized Mobile Full-Height Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed inset-x-0 top-16 h-[calc(100vh-4rem)] border-t overflow-y-auto ${
              isDark ? 'bg-[#121212] border-[#333333]' : 'bg-[#FAF9F6] border-[#E5E5E1]'
            }`}
          >
            <div className="px-3 py-10 flex flex-col justify-between h-full max-w-md mx-auto">
              <div className="space-y-5">
                <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Navigation</p>
                <Link href="/" onClick={() => setIsMenuOpen(false)} className={`block text-sm  uppercase tracking-[0.15em] hover:opacity-60 transition-all ${
                  isDark ? 'text-white' : 'text-[#1A1A1A]'
                }`}>
                  Collections
                </Link>
                
                {user ? (
                  <>
                    <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className={`block text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-all ${
                      isDark ? 'text-white' : 'text-[#1A1A1A]'
                    }`}>
                      Wishlist
                    </Link>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className={`block text-sm  uppercase tracking-[0.15em] hover:opacity-60 transition-all ${
                      isDark ? 'text-white' : 'text-[#1A1A1A]'
                    }`}>
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)} className={`block text-sm  uppercase tracking-[0.15em] hover:opacity-60 transition-all ${
                    isDark ? 'text-white' : 'text-[#1A1A1A]'
                  }`}>
                    Sign In / Register
                  </Link>
                )}

                {profile?.email === 'miracleoliver8@gmail.com' && (
                  <Link href="/admin" onClick={() => setIsMenuOpen(false)} className={`block text-sm  uppercase tracking-[0.15em] hover:opacity-60 transition-all ${
                    isDark ? 'text-white' : 'text-[#1A1A1A]'
                  }`}>
                    Admin Panel
                  </Link>
                )}
              </div>

              {/* Preferences & Secondary actions footer inside menu */}
              <div className={`pt-6 border-t space-y-6 ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                <button 
                  onClick={() => { toggleTheme(); }}
                  className={`flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] py-2 transition-all ${
                    isDark ? 'text-white' : 'text-[#1A1A1A]'
                  }`}
                >
                  <span>Theme Setting</span>
                  {isDark ? <span className="flex items-center gap-2 text-gray-400"><Sun className="w-4 h-4"/> Light</span> : <span className="flex items-center gap-2 text-gray-400"><Moon className="w-4 h-4"/> Dark</span>}
                </button>

                {user && (
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full text-xs font-bold uppercase tracking-[0.2em] text-red-500 py-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Account</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};