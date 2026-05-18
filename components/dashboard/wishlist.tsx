'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authstore';
import { useWishlistStore } from '@/store/wishliststore'
import { useCartStore } from '@/store/cartstore';
import { MOCK_PRODUCTS } from '@/lib/constant';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { useThemeStore } from '@/store/themestore';



export default function Wishlist() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { wishlistItems, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

  const enrichedWishlist = wishlistItems.map((item) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === item.id);
    return product ? product : null;
    }).filter(Boolean) as Product[];

  if (!user) {
    router.push('/auth');
    return null;
  }

  const handleAddToCart = (product: Product) => {
    addItem(product.id, 1);
  };

  return (
    <div className={` ${ isDark ? "bg-[#121212]" : "bg-[#FAF9F6]"} w-full min-h-screen transition-colors duration-500`}>
    
        <div className={`max-w-7xl mx-auto pb-32 transition-colors duration-500 pt-10 px-2 }`}>
            <header className={`mb-16 border-b pb-10 flex justify-between items-end transition-colors ${
                isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'
            }`}>
                <div>
                    <div className={`text-[10px] uppercase mb-4 transition-colors ${
                        isDark ? 'text-white opacity-40' : 'text-black opacity-40'
                    }`}>
                        Curated / Selection
                    </div>
                    <h1 className={`text-5xl font-serif italic leading-[0.9] transition-colors ${
                        isDark ? 'text-white' : 'text-[#1A1A1A]'
                    }`}>
                        Personal <br /> Archive
                    </h1>
                </div>
                <Link 
                    href="/"
                    className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-all ${
                        isDark ? 'text-white opacity-60 hover:opacity-100' : 'text-black opacity-40 hover:opacity-100'
                    }`}
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Collections
                </Link>
            </header>

        {enrichedWishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                {enrichedWishlist.map((item, index) => (
                    <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                    >
                    <div className={`aspect-4/5 mb-6 overflow-hidden relative border transition-colors rounded-xl ${
                        isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
                    }`}>
                        <Image 
                            src={item.imageUrl} 
                            alt={item.name} 
                            fill
                            loading='lazy'
                            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                            className={`object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 ${
                                isDark ? 'opacity-80' : 'opacity-100'
                            }`} 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                        
                        <div className="absolute bottom-6 left-6 right-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                        <button 
                            onClick={() => handleAddToCart(item)}
                            className={`grow py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                            isDark ? 'bg-white text-[#1A1A1A] hover:bg-opacity-80' : 'bg-[#1A1A1A] text-white hover:bg-opacity-90'
                            }`}
                        >
                            <ShoppingBag className="w-3 h-3" /> Quick Add
                        </button>
                        <button 
                            onClick={() => toggleWishlist(item.id)}
                            className={`aspect-square p-4 border hover:border-red-500 hover:text-red-500 transition-all ${
                            isDark ? 'bg-[#121212] border-[#333333] text-white' : 'bg-white border-[#E5E5E1] text-[#1A1A1A]'
                            }`}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <Link href={`/product/${item.id}`} className="cursor-pointer">
                        <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 transition-colors ${
                            isDark ? 'text-white opacity-40' : 'text-black opacity-40'
                        }`}>
                            {item.category}
                        </p>
                        <h4 className={`text-xl font-serif italic transition-colors ${
                            isDark ? 'text-white' : 'text-[#1A1A1A]'
                        }`}>
                            {item.name}
                        </h4>
                        </Link>
                        <span className={`font-mono text-sm tracking-tighter font-bold transition-colors ${
                        isDark ? 'text-white' : 'text-black'
                        }`}>
                        ${item.price.toFixed(2)}
                        </span>
                    </div>
                    {/* <p className={`text-[9px] font-mono uppercase mt-4 transition-colors ${
                        isDark ? 'text-white/40' : 'text-black/30'
                    }`}>
                        Added on {new Date(item.addedAt).toLocaleDateString()}
                    </p> */}
                    </motion.div>
                ))}
            </div>
        ) : (
            <div className={`py-48 text-center border transition-colors ${
            isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'
            }`}>
            <Heart className={`w-12 h-12 mx-auto mb-8 transition-colors ${
                isDark ? 'text-gray-800' : 'text-gray-200'
            }`} />
            <h3 className={`text-2xl font-serif italic mb-4 transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
            }`}>
                No artifacts here.
            </h3>
            <p className={`text-[10px] uppercase tracking-[0.3em] mb-12 transition-colors ${
                isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
                Your personal curation awaits.
            </p>
            <button 
                onClick={() => router.push('/')}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] px-10 py-5 transition-all ${
                isDark ? 'bg-white text-[#1A1A1A] hover:bg-opacity-90' : 'bg-[#1A1A1A] text-white hover:bg-opacity-90'
                }`}
            >
                Explore Collections
            </button>
            </div>
        )}
        </div>
    </div>
  );
}