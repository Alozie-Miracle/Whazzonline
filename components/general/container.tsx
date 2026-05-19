'use client'

import { Navbar } from "./navbar";
import { CartDrawer } from "./cartdrawer";
import { useState } from 'react';

export default function ContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);



  return (
    <div className="w-full min-h-screen">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {children}
    </div>
  );
}