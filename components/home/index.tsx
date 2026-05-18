"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';
import { ProductCard } from '@/components/home/productcard';
import { useThemeStore } from "@/store/themestore";
import { MOCK_PRODUCTS } from '@/lib/constant';

const Index = () => {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isDark = theme === 'dark';

  // Extract unique categories from static matrix cleanly
  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollIntoView = () => {
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 lg:pt-5  pb-32 transition-colors duration-500">
      {/* Hero Section Card Node */}
      <section className={`relative h-150 lg:rounded-[3rem] overflow-hidden border transition-colors duration-500 ${
        isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-white border-[#E5E5E1]'
      }`}>
        <div className="absolute inset-0 flex flex-col-reverse lg:flex-row">
          <div className="relative p-5 lg:p-12 flex flex-col justify-center shrink-0 md:w-[40%]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-4 ${
                isDark ? 'text-white/40' : 'text-[#1A1A1A]'
              }`}
            >
              Whazzonline Collection 01
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl sm:text-7xl font-serif italic mb-8 leading-[0.9] ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              Curated <br /> Artifacts
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-sm mb-10 max-w-xs leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              A selection of high-performance electronics and essentials, designed for the modern minimal enthusiast.
            </motion.p>
            
            <motion.button 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 10 }}
              onClick={scrollIntoView}
              className={`text-xs font-bold uppercase tracking-widest flex items-center gap-4 group ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              Shop the archives
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
          
          {/* Layout-Optimized Media Wrapper Node */}
          <div className={`relative block border-l overflow-hidden shrink-0 flex-1 ${
            isDark ? 'bg-[#121212] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
          }`}>
            <Image 
              src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero Showcase Artifact" 
              fill
              priority
              sizes="50vw"
              className={`object-cover transition-all duration-1000 grayscale-[0.3] hover:grayscale-0 ${
                isDark ? 'opacity-80' : 'opacity-100'
              }`}
            />
          </div>
        </div>
      </section>

      {/* Grid Layout Chassis with Functional Sidebar Filters */}
      <div className="flex flex-col lg:flex-row gap-16 px-3">
        <aside className="w-full lg:w-48 shrink-0">
          <div className="sticky top-24 space-y-12">
            <div>
              <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-40 ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Collections
              </h3>
              <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-sm font-light text-left transition-all cursor-pointer ${
                      filter === cat 
                        ? `font-bold italic border-b w-fit ${isDark ? 'text-white border-white' : 'text-[#1A1A1A] border-[#1A1A1A]'}` 
                        : 'text-gray-400 hover:text-[#1A1A1A] '
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-40 ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Search
              </h3>
              <input 
                type="text" 
                placeholder="Find object..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-b py-2 text-[10px] font-medium uppercase tracking-widest focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-[#333333] text-white focus:border-white placeholder:text-gray-700' 
                    : 'border-[#E5E5E1] text-[#1A1A1A] focus:border-[#1A1A1A] placeholder:text-gray-400'
                }`}
              />
            </div>
          </div>
        </aside>

        {/* Catalog Main Pipeline Node */}
        <main className="flex-1">
          <div id="products-grid" className={`mb-12 flex justify-between items-end border-b pb-6 ${
            isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'
          }`}>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1 ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Spring / Summer 2024
              </p>
              <h2 className={`text-4xl font-serif italic transition-colors ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}>
                The Objects
              </h2>
            </div>
            <div className={`text-[10px] font-mono opacity-40 uppercase tracking-widest ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              Showing {filteredProducts.length} Results
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard 
                      product={product} 
                      onViewDetails={(id) => router.push(`/product/${id}`)} 
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className={`w-16 h-16 border rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-white border-[#E5E5E1]'
                  }`}>
                    <Search className={`w-6 h-6 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                  </div>
                  <h3 className={`text-lg font-serif italic transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    No objects found
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};


export default Index;