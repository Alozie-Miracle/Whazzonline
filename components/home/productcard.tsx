"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useCartStore } from '@/store/cartstore'; 
import { useThemeStore } from "@/store/themestore";
import { Product } from '@/types'; // Adjust this path mapping to match your structure
import { useProducts } from '@/hooks/useProduct';
import { useAuthStore } from '@/store/authstore';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { user } = useAuthStore()
  const theme = useThemeStore((state) => state.theme);
  const { addProductToCart, loading: isAdding, error } = useProducts();
  const isDark = theme === 'dark';
  const router = useRouter()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return router.push('/auth'); 

    
    await addProductToCart(product._id, 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group cursor-pointer flex flex-col h-full"
      onClick={() => onViewDetails(product._id)}
    >
      {/* Optimized Media Matrix Wrapper */}
      <div className={`relative aspect-4/5 mb-4 overflow-hidden border transition-colors duration-500 rounded-2xl ${
        isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
      }`}>
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          fill
          loading='lazy'
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 ${
            isDark ? 'opacity-80' : 'opacity-100'
          }`} 
        />
        
        {/* Dynamic Contextual Quick Add Trigger Element */}
        {error && (
          <div className={`absolute inset-0 flex items-center justify-center bg-red-500/80 text-white text-sm font-bold rounded-2xl z-20 p-4 text-center ${
            isDark ? 'bg-red-600/90' : 'bg-red-500/80'
          }`}>
            {error}
          </div>
        )}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`absolute bottom-4 cursor-pointer left-4 right-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-10 ${
            isDark 
              ? 'bg-[#1A1A1A] text-white border border-[#333333] shadow-none' 
              : 'bg-white text-black border border-[#E5E5E1] shadow-xl'
          }`}
        >
          {isAdding ? 'Artifact Added' : 'Quick Add +'}
        </button>
      </div>

      {/* Meta Properties and Valuation Node Layout */}
      <div className="flex justify-between items-start">
        <div className="grow pr-4">
          <h2 className={`text-lg font-serif italic mb-1 group-hover:opacity-60 transition-opacity ${
            isDark ? 'text-white' : 'text-[#1A1A1A]'
          }`}>
            {product.name}
          </h2>
          <p className={`text-[10px] uppercase tracking-widest font-bold ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            {product.category}
          </p>
        </div>
        <span className={`font-mono text-sm font-bold tracking-tighter ${
          isDark ? 'text-white' : 'text-[#1A1A1A]'
        }`}>
          ${product.price.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
};