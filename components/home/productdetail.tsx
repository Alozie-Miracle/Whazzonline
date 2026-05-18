"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Truck, Plus, Minus, ArrowLeft, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartstore';
import { useThemeStore } from "@/store/themestore";
import { useWishlistStore } from "@/store/wishliststore";
import { useAuthStore } from "@/store/authstore";
import { MOCK_PRODUCTS } from '@/lib/constant';
import { Product } from '@/types';

export const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);
  const { toggleWishlist: toggleStoreWishlist, isInWishlist } = useWishlistStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeInfoTab, setActiveInfoTab] = useState<'specs' | 'reviews' | 'shipping'>('specs');
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const isDark = theme === 'dark';
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const isWishlisted = id ? isInWishlist(id) : false;

    useEffect(() => {
        if (product) {
            // Filter out the current product being viewed
            const remainingProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id);

            // Prioritize products from the exact same category
            let clientRecs = remainingProducts.filter((p) => p.category === product.category);

            // If there aren't enough items in the same category, fill up the remainder from other categories
            if (clientRecs.length < 3) {
            const fillers = remainingProducts.filter((p) => !clientRecs.includes(p));
            clientRecs = [...clientRecs, ...fillers];
            }

            // Limit the results to a maximum of 3 products
            setRecommendations(clientRecs.slice(0, 3));
        }
    }, [product]);

  const handleToggleWishlist = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    if (!id) return;
    toggleStoreWishlist(id);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addItem(product.id, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (!product) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className={`text-2xl font-serif italic ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
          Object not found
        </h2>
        <button 
          onClick={() => router.push('/')} 
          className="mt-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Return to Archives
        </button>
      </div>
    );
  }

  const mockReviews = [
    { id: 1, user: 'Alexander K.', rating: 5, date: '2024-03-12', comment: 'The material quality exceeded my expectations. A true design masterpiece.' },
    { id: 2, user: 'Elena P.', rating: 4, date: '2024-02-28', comment: 'Minimalist aesthetic at its best. The packaging alone is a work of art.' },
    { id: 3, user: 'Marcus T.', rating: 5, date: '2024-01-15', comment: 'Seamless integration into my collection. The proportions are perfect.' },
  ];

  return (
    <div className="pb-10 lg:pt-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Gallery Interface Node */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className={`relative aspect-4/5 lg:border overflow-hidden lg:rounded-xl h-[50vh] lg:h-fit w-full ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'}`}>
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity grayscale-[0.2] ${isDark ? 'opacity-80' : 'opacity-100'}`} 
            />
          </div>
          <div className="grid grid-cols-4 gap-4 px-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`relative aspect-square border opacity-60 hover:opacity-100 transition-opacity cursor-pointer overflow-hidden rounded-xl ${
                  isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
                }`}
              >
                <Image 
                  src={product.imageUrl} 
                  alt={`${product.name} View ${i + 1}`} 
                  fill
                  sizes="12vw"
                  loading='lazy'
                  className={`object-cover grayscale-[0.2]  ${isDark ? 'opacity-80' : 'opacity-100'}`}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Content Node */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col px-2"
        >
          <div className="mb-12">
            <div className={`text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Category / {product.category}
            </div>
            <h1 className={`text-5xl sm:text-6xl font-serif italic leading-[0.9] mb-8 transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {product.name}
            </h1>
            
            <div className={`flex items-center gap-6 border-y py-4 transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
              <span className={`font-mono text-2xl font-bold tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ${product.price.toFixed(2)}
              </span>
              <div className={`w-px h-4 ${isDark ? 'bg-[#333333]' : 'bg-[#E5E5E1]'}`} />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                        i < Math.floor(product.rating || 0) 
                            ? (isDark ? 'fill-white text-white' : 'fill-[#1A1A1A] text-[#1A1A1A]') 
                            : (isDark ? 'text-gray-500' : 'text-gray-200')
                        }`} 
                    />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-40 font-sans ${isDark ? 'text-white' : 'text-black'}`}>
              Description
            </h3>
            <p className={`text-sm leading-relaxed font-sans max-w-md transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.description}
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-8">
              <div className={`flex items-center py-2 gap-8 border-b transition-colors ${isDark ? 'border-white text-white' : 'border-[#1A1A1A] text-[#1A1A1A]'}`}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-xs hover:opacity-50"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-mono font-bold w-4 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-xs hover:opacity-50"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-grow py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-opacity-90 transition-all disabled:opacity-50 ${
                  isDark ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'
                }`}
              >
                {isAdding ? 'Artifact Added' : 'Acquire Object'}
              </button>

              <button 
                onClick={handleToggleWishlist}
                className={`p-5 border transition-all ${
                  isWishlisted 
                    ? `bg-[#1A1A1A] border-[#1A1A1A] text-white dark:bg-white dark:border-white dark:text-[#1A1A1A]` 
                    : `border-[#E5E5E1] dark:border-[#333333] hover:border-[#1A1A1A] dark:hover:border-white ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white dark:fill-[#1A1A1A]' : ''}`} />
              </button>
            </div>

            {/* Checklist Matrix */}
            <div className={`grid grid-cols-1 gap-6 pt-12 border-t transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
              <div className="flex items-start gap-4">
                 <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                 <div>
                    <h4 className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>Authentication</h4>
                    <p className={`text-[10px] mt-1 uppercase font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Verified Artifact Guarantee</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <Truck className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                 <div>
                    <h4 className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>Logistics</h4>
                    <p className={`text-[10px] mt-1 uppercase font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Complimentary Global Shipping</p>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Details & Reviews Tabs Chassis */}
      <div className="mt-32 px-2">
        <div className={`flex gap-12 border-b mb-12 transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
          {['specs', 'reviews', 'shipping'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveInfoTab(tab as any)}
              className={`pb-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${
                activeInfoTab === tab ? (isDark ? 'text-white' : 'text-[#1A1A1A]') : 'text-gray-400'
              }`}
            >
              {tab}
              {activeInfoTab === tab && (
                <motion.div 
                  layoutId="activeTab" 
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-white' : 'bg-[#1A1A1A]'}`} 
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-75">
          {activeInfoTab === 'specs' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16"
            >
              <div className="space-y-8">
                <p className={`text-sm leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Precision engineered using industry-leading materials. Each object undergoes a 12-stage validation process to ensure perfect alignment with our aesthetic standards.
                </p>
                <div className="space-y-4">
                  {[
                    { label: 'Origin', value: 'Global Archive' },
                    { label: 'Material', value: 'Mixed Composition' },
                    { label: 'Dimensions', value: 'Standard Artifact Size' },
                    { label: 'Weight', value: 'Calibrated Gradient' },
                  ].map((spec) => (
                    <div key={spec.label} className={`flex justify-between border-b pb-4 transition-colors ${isDark ? 'border-[#222222]' : 'border-[#F5F5F3]'}`}>
                      <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-black'}`}>{spec.label}</span>
                      <span className={`text-[10px] font-mono font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`aspect-video border flex items-center justify-center p-12 transition-colors ${
                isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
              }`}>
                <div className="text-center">
                  <div className={`text-[10px] font-mono uppercase tracking-[0.5em] mb-4 opacity-20 ${isDark ? 'text-white' : 'text-black'}`}>Technical Blueprint</div>
                  <div className={`w-32 h-px opacity-10 ${isDark ? 'bg-white' : 'bg-[#1A1A1A]'}`} />
                </div>
              </div>
            </motion.div>
          )}

          {activeInfoTab === 'reviews' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                <div className="space-y-2">
                  <h3 className={`text-4xl font-serif italic transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{product.rating?.toFixed(1)}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'fill-[#1A1A1A] text-[#1A1A1A] dark:fill-white dark:text-white' : 'text-gray-200 dark:text-gray-800'}`} />
                    ))}
                  </div>
                  <p className={`text-[10px] font-mono opacity-40 uppercase transition-colors ${isDark ? 'text-white' : 'text-black'}`}>Based on {mockReviews.length * 4} Verified User Reviews</p>
                </div>
                <button className={`h-fit py-4 px-10 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isDark 
                    ? 'border-white text-white hover:bg-white hover:text-[#1A1A1A]' 
                    : 'border-black text-[#1A1A1A] hover:bg-black hover:text-white'
                }`}>
                  Documentation Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {mockReviews.map((review) => (
                  <div key={review.id} className={`p-8 border transition-colors ${
                    isDark ? 'border-[#222222] hover:border-white' : 'border-[#F5F5F3] hover:border-[#1A1A1A]'
                  }`}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{review.user}</div>
                        <div className={`text-[9px] font-mono opacity-30 uppercase ${isDark ? 'text-white' : 'text-black'}`}>{review.date}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-2 h-2 ${i < review.rating ? 'fill-[#1A1A1A] text-[#1A1A1A] dark:fill-white dark:text-white' : 'text-gray-200 dark:text-gray-800'}`} />
                        ))}
                      </div>
                    </div>
                    <p className={`text-sm italic leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeInfoTab === 'shipping' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl space-y-8"
            >
              <div className="space-y-4">
                <h4 className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>Global Fulfillment</h4>
                <p className={`text-sm leading-relaxed font-sans transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  We provide secure, insured transit for all archive objects. Our logistics network ensures that items arrive in pristine condition, preserved for your collection.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className={`p-6 border transition-colors ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#F9F9F7] border-[#E5E5E1]'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Domestic</p>
                  <p className={`text-[10px] font-mono opacity-40 uppercase ${isDark ? 'text-white' : 'text-black'}`}>3 - 5 Archival Cycles</p>
                </div>
                <div className={`p-6 border transition-colors ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#F9F9F7] border-[#E5E5E1]'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-white' : 'text-black'}`}>International</p>
                  <p className={`text-[10px] font-mono opacity-40 uppercase ${isDark ? 'text-white' : 'text-black'}`}>7 - 14 Archival Cycles</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Contextual Intelligence Recommendations Selection Section */}
      {recommendations.length > 0 && (
        <section className="mt-48 transition-colors duration-500 px-2">
          <div className={`mb-12 border-b pb-6 flex justify-between items-end transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Related Objects</p>
              <h2 className={`text-4xl font-serif italic ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>The Selection</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="group cursor-pointer"
                onClick={() => {
                  router.push(`/product/${rec.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className={`relative aspect-4/3 border mb-6 overflow-hidden transition-colors rounded-xl ${
                  isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'
                }`}>
                  <Image 
                    src={rec.imageUrl} 
                    alt={rec.name} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0 ${isDark ? 'opacity-80' : 'opacity-100'}`} 
                  />
                </div>
                <div className="flex justify-between items-start">
                  <h4 className={`text-base font-serif italic transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>{rec.name}</h4>
                  <span className={`font-mono text-sm tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>${rec.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};