'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authstore';

import { motion } from 'framer-motion';

import { Package, Heart, User as UserIcon } from 'lucide-react';
import { useThemeStore } from '@/store/themestore';
import Profile from './profile';
import DashboardWaitlist from './dashboardwaitlist';
import { useProducts } from '@/hooks/useProduct';

const Dashboard = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const { user, profile } = useAuthStore();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');
  const [orderPage, setOrderPage] = useState(1);

  const { fetchUserOrders, loading: userOrdersLoading, orders, wishlist, fetchWishlistProducts } = useProducts();
  
  useEffect(() => {
    const initializeDashboard = async () => {
      if (!user) {
        router.push('/auth');
        return;
      }

      await fetchUserOrders();
      await fetchWishlistProducts();
    };

    initializeDashboard();
  }, [fetchUserOrders, fetchWishlistProducts]);

  const ordersPerPage = 2;
  const totalOrderPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice((orderPage - 1) * ordersPerPage, orderPage * ordersPerPage);


  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    setLoading(false);
  }, [user, router]);

  if (userOrdersLoading) {
    return (
      <div className={`w-full min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? "bg-[#121212] text-white" : "bg-[#FAF9F6] text-black"}`}>
        <div className="text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Initializing Dashboard...</div>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 ${isDark ? "bg-[#121212]" : "bg-[#FAF9F6]"}`}>
      <div className="max-w-7xl mx-auto pb-32 px-4 sm:px-6 lg:px-8 pt-12">
        <header className={`mb-16 border-b pb-10 flex flex-col md:flex-row justify-between items-start gap-6 transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-4 transition-colors ${isDark ? 'text-white/40' : 'text-black/40'}`}>
              User / Account
            </div>
            <h1 className={`text-5xl font-serif italic leading-[0.9] transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
              Identity <br /> Hub
            </h1>
          </div>
          <div className={`flex gap-8 text-[10px] font-bold uppercase tracking-widest border-b border-transparent transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${activeTab === 'orders' ? (isDark ? 'border-white text-white' : 'border-[#1A1A1A] text-black') : 'border-transparent opacity-40'}`}
            >
              Acquisitions ({orders.length})
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${activeTab === 'wishlist' ? (isDark ? 'border-white text-white' : 'border-[#1A1A1A] text-black') : 'border-transparent opacity-40'}`}
            >
              Aspirations ({wishlist?.products.length})
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${activeTab === 'profile' ? (isDark ? 'border-white text-white' : 'border-[#1A1A1A] text-black') : 'border-transparent opacity-40'}`}
            >
              Profile
            </button>
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'orders' && (
            <div className="space-y-12">
              {paginatedOrders.length > 0 ? (
                <>
                  {paginatedOrders.map((order) => (
                    <div key={order._id} className={`border p-8 md:p-12 transition-colors group rounded-2xl ${isDark ? 'border-[#2c2b2b] hover:border-white' : 'border-[#E5E5E1] hover:border-[#1A1A1A]'}`}>
                      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
                        <div className="space-y-2">
                          <div className={`text-[10px] font-mono uppercase transition-colors ${isDark ? 'text-white/40' : 'text-black/40'}`}>ORD_REF: {order._id.toUpperCase()}</div>
                          <div className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-white' : 'text-black'}`}>Status: {order.status}</div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className={`text-[10px] font-mono uppercase mb-2 transition-colors ${isDark ? 'text-white/40' : 'text-black/40'}`}>{new Date(order.createdAt).toLocaleDateString()}</div>
                          <div className={`text-2xl font-mono font-bold tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-black'}`}>${order.totalAmount.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="space-y-4">
                            <div className={`aspect-4/5 overflow-hidden grayscale-[0.2] transition-all rounded-xl group-hover:grayscale-0 relative border ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'}`}>
                              <Image 
                                src={item.product.imageUrl} 
                                alt={item.product.name} 
                                fill 
                                sizes="(max-w-768px) 100vw, 25vw"
                                className={`object-cover ${isDark ? 'opacity-80' : ''}`} 
                              />
                            </div>
                            <div>
                              <h4 className={`text-[11px] font-bold uppercase truncate transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{item.product.name}</h4>
                              <p className={`text-[10px] font-mono uppercase transition-colors ${isDark ? 'text-white/40' : 'text-black/40'}`}>QTY: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {totalOrderPages > 1 && (
                    <div className="flex justify-center items-center gap-8 pt-12">
                      <button 
                        onClick={() => setOrderPage(p => Math.max(1, p - 1))}
                        disabled={orderPage === 1}
                        className={`text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 flex items-center gap-2 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                      >
                        Previous
                      </button>
                      <span className={`text-[10px] font-mono transition-colors ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                        {orderPage} / {totalOrderPages}
                      </span>
                      <button 
                        onClick={() => setOrderPage(p => Math.min(totalOrderPages, p + 1))}
                        disabled={orderPage === totalOrderPages}
                        className={`text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 flex items-center gap-2 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className={`py-32 text-center border-2 border-dashed rounded-4xl transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                  <Package className={`w-8 h-8 mx-auto mb-6 transition-colors ${isDark ? 'text-gray-700' : 'text-gray-200'}`} />
                  <h3 className={`text-xl font-serif italic transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>No history found</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">Begin your collection journey</p>
                  <button 
                    onClick={() => router.push('/')}
                    className={`mt-8 text-[10px] font-bold border-b pb-1 transition-colors ${isDark ? 'border-white text-white' : 'border-black text-black'}`}
                  >
                    Explore Archives
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <DashboardWaitlist enrichedWishlist={wishlist?.products || []} isDark={isDark} router={router} />
          )}

          {activeTab === 'profile' && (
            <Profile isDark={isDark} profile={profile} user={user} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;