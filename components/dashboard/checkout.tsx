"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authstore';
import { Product, Order, OrderItem } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartstore';
import { MOCK_PRODUCTS } from '@/lib/constant';
import { CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { useThemeStore } from '@/store/themestore';
import { useProducts } from '@/hooks/useProduct';

export const Checkout = () => {
    const { user } = useAuthStore();
    const router = useRouter();
    const { items, clearCart } = useCartStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [step, setStep] = useState<'info' | 'payment'>('info');

    const { cartItems, fetchCartProducts, loading: isLoading, error, checkout } = useProducts();

    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    // Form state
    const [address, setAddress] = useState({
        fullName: '',
        email: user?.email || '',
        street: '',
        city: '',
        zip: '',
        country: 'USA'
    });

    useEffect(() => {
        if (!user) {
        router.push('/auth');
        return;
        }
        setLoading(false);
    }, [user, router]);

    useEffect(() => {
        if (user) fetchCartProducts();
    }, [user])


    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shippingCharge = 15.00;
    const grandTotal = totalPrice + shippingCharge;

    

    const handleProcessCheckout = async () => {
        if (!user) return;
        setIsProcessing(true);
        
        await checkout(onSuccess, address);
    };
    
    const onSuccess = (orderData: any) => {
        setIsProcessing(false);
        clearCart();
        setIsSuccess(true);
        setTimeout(() => router.push('/dashboard'), 3000);
    }

    if (isLoading) {
        return (
        <div className={`min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-[#121212]' : 'bg-transparent'}`}>
            <Loader2 className={`w-8 h-8 animate-spin ${isDark ? 'text-gray-800' : 'text-gray-200'}`} />
        </div>
        );
    }

    if (cartItems.length === 0 && !isSuccess) {
        return (
        <div className={`min-h-screen flex flex-col items-center justify-center text-center transition-colors ${isDark ? 'bg-[#121212]' : 'bg-transparent'}`}>
            <h2 className={`text-2xl font-serif italic transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Your bag is empty</h2>
            <button 
            onClick={() => router.push('/')} 
            className={`mt-8 text-[10px] font-bold uppercase cursor-pointer tracking-widest transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
            >
            Return to Archives
            </button>
        </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center text-center transition-colors ${isDark ? 'bg-[#121212]' : 'bg-transparent'}`}>
                <h2 className={`text-2xl font-serif italic transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>An error occurred</h2>
                <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{error || 'Something went wrong.'}</p>
                <button 
                    onClick={() => router.push('/')} 
                    className={`mt-8 text-[10px] font-bold cursor-pointer uppercase tracking-widest transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                >
                    Return to Archives
                </button>
        </div>
        )
    }

    if (isSuccess) {
        return (
        <div className={`flex flex-col items-center justify-center text-center transition-colors min-h-screen ${isDark ? 'bg-[#121212]' : 'bg-transparent'}`}>
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-24 h-24 flex items-center justify-center rounded-full mb-12 ${isDark ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'}`}
            >
            <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <h2 className={`text-4xl font-serif italic mb-4 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Transaction Confirmed</h2>
            <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Authenticating acquisition history...</p>
            <p className={`text-[10px] uppercase tracking-[0.3em] mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Redirecting to Identity Hub in 3s</p>
        </div>
        );
    }

    return (
        <div className={`w-full min-h-screen transition-colors py-10 px-5 ${isDark ? 'bg-[#121212]' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto transition-colors duration-500 w-full min-h-screen">
                <header className={`mb-16 border-b pb-10 ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 ${isDark ? 'text-white' : ''}`}>
                        Commerce / Checkout
                    </div>
                    <h1 className={`text-5xl font-serif italic leading-[0.9] transition-colors ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        Acquisition <br /> Process
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7">
                    <div className={`flex gap-8 mb-12 text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-white' : ''}`}>
                        <div className={`pb-2 border-b-2 transition-all ${step === 'info' ? (isDark ? 'border-white' : 'border-[#1A1A1A]') : 'border-transparent opacity-20'}`}>
                        01/ Shipping Details
                        </div>
                        <div className={`pb-2 border-b-2 transition-all ${step === 'payment' ? (isDark ? 'border-white' : 'border-[#1A1A1A]') : 'border-transparent opacity-20'}`}>
                        02/ Secure Transaction
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'info' ? (
                        <motion.div
                            key="info"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Recipient Name</label>
                                <input 
                                    type="text" 
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium uppercase tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    value={address.fullName}
                                    onChange={e => setAddress({...address, fullName: e.target.value})}
                                />
                                </div>
                                <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Email Address</label>
                                <input 
                                    type="email" 
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    value={address.email}
                                    onChange={e => setAddress({...address, email: e.target.value})}
                                />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Physical Location</label>
                                <input 
                                type="text" 
                                placeholder="STREET ADDRESS"
                                className={`w-full bg-transparent border-b py-3 text-[10px] font-medium uppercase tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white placeholder:text-gray-700' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                value={address.street}
                                onChange={e => setAddress({...address, street: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>City</label>
                                <input 
                                    type="text" 
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium uppercase tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    value={address.city}
                                    onChange={e => setAddress({...address, city: e.target.value})}
                                />
                                </div>
                                <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Postal Code</label>
                                <input 
                                    type="text" 
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium uppercase tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    value={address.zip}
                                    onChange={e => setAddress({...address, zip: e.target.value})}
                                />
                                </div>
                                <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Jurisdiction</label>
                                <select 
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    value={address.country}
                                    onChange={e => setAddress({...address, country: e.target.value})}
                                >
                                    <option value="USA" className={isDark ? 'bg-[#1A1A1A]' : ''}>United States</option>
                                    <option value="UK" className={isDark ? 'bg-[#1A1A1A]' : ''}>United Kingdom</option>
                                    <option value="EU" className={isDark ? 'bg-[#1A1A1A]' : ''}>European Union</option>
                                </select>
                                </div>
                            </div>
                            </div>
                            <button 
                                onClick={() => setStep('payment')}
                                disabled={!address.fullName || !address.street || !address.city}
                                className="w-full py-5 bg-[#1A1A1A] text-white text-[10px] rounded-xl cursor-pointer font-bold uppercase tracking-[0.3em] hover:bg-opacity-90 transition-all disabled:opacity-20 flex items-center justify-center gap-4"
                            >
                                Proceed to Transaction <ArrowRight className="w-3 h-3" />
                            </button>
                        </motion.div>
                        ) : (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            <div className={`p-8 border space-y-8 transition-colors ${isDark ? 'border-[#333333] bg-[#1A1A1A]' : 'border-[#E5E5E1] bg-white'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white' : ''}`}>Credit / Debit Terminal</div>
                                <Lock className={`w-3 h-3 opacity-20 ${isDark ? 'text-white' : ''}`} />
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Key Number</label>
                                <input 
                                    type="text" 
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                />
                                </div>
                                <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-2">
                                    <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>Expiry</label>
                                    <input 
                                    type="text" 
                                    placeholder="MM / YY"
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] font-bold uppercase tracking-widest opacity-40 transition-colors ${isDark ? 'text-white' : ''}`}>CVC</label>
                                    <input 
                                    type="text" 
                                    placeholder="000"
                                    className={`w-full bg-transparent border-b py-3 text-[10px] font-medium tracking-widest focus:outline-none transition-colors ${isDark ? 'border-[#333333] focus:border-white text-white' : 'border-[#E5E5E1] focus:border-[#1A1A1A]'}`}
                                    />
                                </div>
                                </div>
                            </div>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                            <button 
                                onClick={handleProcessCheckout}
                                disabled={isProcessing}
                                className="w-full py-5 bg-[#1A1A1A] text-white cursor-pointer rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                            >
                                {isProcessing ? 'Verifying Transaction...' : `Authenticate Payment of $${grandTotal.toFixed(2)}`}
                                {!isProcessing && <CreditCard className="w-3 h-3" />}
                            </button>
                            <button 
                                onClick={() => setStep('info')}
                                disabled={isProcessing}
                                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline"
                            >
                                Return to Logistic Configuration
                            </button>
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>

                    <div className="lg:col-span-5">
                    <div className="sticky top-32 space-y-12">
                        <div className={`border rounded-xl p-10 space-y-10 transition-colors ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'}`}>
                        <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border-b pb-4 opacity-40 transition-colors ${isDark ? 'border-[#333333] text-white' : 'border-[#E5E5E1]'}`}>Object Summary</h3>
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                            <div key={item._id} className="flex gap-6">
                                <div className={`relative w-20 h-20 border shrink-0 overflow-hidden grayscale-[0.2] rounded-full ${isDark ? 'bg-[#121212] border-[#333333]' : 'bg-white border-[#E5E5E1]'}`}>
                                    <Image 
                                        src={item.product.imageUrl} 
                                        alt={item.product.name} 
                                        fill
                                        sizes="64px"
                                        loading='lazy'
                                        className={`object-cover ${isDark ? 'opacity-80' : ''}`} 
                                    />
                                </div>
                                <div className="grow flex flex-col justify-between py-1">
                                <div>
                                    <h4 className={`text-[11px] font-bold uppercase tracking-tight truncate w-32 transition-colors ${isDark ? 'text-white' : ''}`}>{item.product.name}</h4>
                                    <p className={`text-[10px] font-mono opacity-40 uppercase mt-1 ${isDark ? 'text-white' : ''}`}>QTY: {item.quantity}</p>
                                </div>
                                <span className={`text-[11px] font-bold font-mono transition-colors ${isDark ? 'text-white' : ''}`}>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                            ))}
                        </div>

                        <div className={`pt-10 border-t space-y-4 ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                            <div className={`flex justify-between text-[11px] uppercase tracking-widest transition-colors ${isDark ? 'text-white' : ''}`}>
                                <span>Artifact Total</span>
                                <span className="font-mono">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between text-[11px] uppercase tracking-widest transition-colors ${isDark ? 'text-white' : ''}`}>
                                <span>Global Logistics</span>
                                <span className="font-mono">${shippingCharge.toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between text-[13px] uppercase tracking-[0.2em] pt-4 border-t ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                                <span className={`transition-colors ${isDark ? 'text-white' : ''}`}>Grand Total</span>
                                <span className={`font-mono underline transition-colors ${isDark ? 'text-white' : ''}`}>${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        </div>

                        <div className={`space-y-6 pt-6 border-t transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                        <div className="flex gap-4">
                            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                            <div>
                            <h4 className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white' : ''}`}>Secure Protocol</h4>
                            <p className={`text-[10px] mt-1 font-mono uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>256-Bit Encrypted</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Truck className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                            <div>
                            <h4 className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white' : ''}`}>Logistics Hub</h4>
                            <p className={`text-[10px] mt-1 font-mono uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Global Distribution Active</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};