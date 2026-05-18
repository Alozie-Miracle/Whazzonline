"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/store/cartstore'; 
import { useThemeStore } from "@/store/themestore"; 
import { MOCK_PRODUCTS } from '@/lib/constant';
import { Product } from '@/types';
import { useAuthStore } from '@/store/authstore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Intersecting your core Product type with the dynamic runtime cart payload
type CartProduct = Product & {
  quantity: number;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, totalItems } = useCartStore();
  const theme = useThemeStore((state) => state.theme);
  const { user } = useAuthStore()
  const router = useRouter();

  const isDark = theme === 'dark';

  // Locks background body scroll while the context layer tree is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Aggregate processing mapping strictly typed instances to active cart entries
  const cartProducts = items
    .map((item) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((p): p is CartProduct => p !== null);

  const totalPrice = cartProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handleCheckout = () => {
    onClose();
    
    if (user) {
      router.push('/dashboard/checkout');
    } else {
      router.push('/auth?redirect=/dashboard/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Background Accent Mask */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
          />

          {/* Drawer Chassis Container */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 bottom-0 w-full max-w-sm shadow-2xl z-70 flex flex-col border-l transition-colors duration-500 ${
              isDark 
                ? 'bg-[#1A1A1A] border-[#333333]' 
                : 'bg-[#FAF9F6] border-[#E5E5E1]'
            }`}
          >
            {/* Header Structural Segment */}
            <div className={`px-2 py-6 border-b flex items-center justify-between ${
              isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'
            }`}>
              <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}>
                Shopping Bag ({totalItems})
              </h2>
              <button 
                onClick={onClose} 
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'hover:bg-[#222222]' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Central Product List Node Wrapper */}
            <div className="grow overflow-y-auto px-2 py-6 space-y-8 no-scrollbar">
              {cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    
                    {/* Next.js Highly-Optimized Structural Layout Image Engine Node */}
                    <div className={`w-20 h-24 shrink-0 relative border overflow-hidden ${
                      isDark ? 'bg-[#121212] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
                    }`}>
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill
                        sizes="80px"
                        priority={true}
                        className={`object-cover transition-opacity ${
                          isDark ? 'opacity-80 grayscale-[0.1]' : 'grayscale-[0.2]'
                        }`} 
                      />
                    </div>
                    
                    {/* Item Information and Context Actions Meta Section */}
                    <div className="grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className={`text-[11px] font-bold uppercase tracking-tight ${
                          isDark ? 'text-white' : 'text-[#1A1A1A]'
                        }`}>
                          {product.name}
                        </h4>
                        <p className={`text-[10px] font-mono uppercase mt-1 opacity-40 ${
                          isDark ? 'text-white' : 'text-black'
                        }`}>
                          Qty: {product.quantity}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${
                          isDark ? 'text-white' : 'text-[#1A1A1A]'
                        }`}>
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(product.id, product.quantity - 1)} 
                              className="text-[10px] text-gray-400 cursor-pointer hover:text-red-500 px-1 transition-colors"
                            >
                              -
                            </button>
                            <span className={`text-[10px] font-mono ${
                              isDark ? 'text-white' : 'text-[#1A1A1A]'
                            }`}>
                              {product.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(product.id, product.quantity + 1)} 
                              className="text-[10px] text-gray-400 cursor-pointer hover:text-green-500 px-1 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(product.id)} 
                            className={`text-[9px] uppercase font-bold tracking-tighter underline ${
                              isDark ? 'text-white/60 hover:text-white' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                            }`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                  <h3 className={`text-sm font-serif italic ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your bag is empty
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    Discover new artifacts
                  </p>
                </div>
              )}
            </div>

            {/* Interactive Checkout Drawer Footer Section */}
            {cartProducts.length > 0 && (
              <div className={`p-8 border-t transition-colors ${
                isDark ? 'bg-[#121212] border-[#333333]' : 'bg-[#FAF9F6] border-[#E5E5E1]'
              }`}>
                <div className="flex justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    Subtotal
                  </span>
                  <span className={`text-xl font-mono font-bold tracking-tighter ${
                    isDark ? 'text-white' : 'text-[#1A1A1A]'
                  }`}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <div className={`flex justify-between mb-8 text-[10px] italic opacity-40 ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  <span>Shipping & Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className={`w-full py-4 text-[10px] cursor-pointer rounded-xl hover:scale-105 duration-300 ease-in-out active:scale-95 font-bold uppercase tracking-[0.2em] transition-all hover:bg-opacity-90 ${
                    isDark 
                      ? 'bg-white text-[#1A1A1A]' 
                      : 'bg-[#1A1A1A] text-white'
                  }`}
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};