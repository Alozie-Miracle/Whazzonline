import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  
  // Actions matching your exact context signature
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      addItem: async (productId, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(item => item.productId === productId);
        let updatedItems = [...currentItems];

        if (existingItemIndex > -1) {
          // If product exists in cart, increment quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
        } else {
          // Add new product entry
          updatedItems.push({ productId, quantity });
        }

        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
        });
      },

      removeItem: async (productId) => {
        const updatedItems = get().items.filter(item => item.productId !== productId);
        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
        });
      },

      updateQuantity: async (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const updatedItems = get().items.map(item => 
          item.productId === productId ? { ...item, quantity } : item
        );

        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0)
        });
      },

      clearCart: async () => {
        set({ items: [], totalItems: 0 });
      },
    }),
    {
      name: 'cart-storage', // Automatically saves the cart to localStorage
      skipHydration: true,   // Prevents Next.js SSR hydration mismatches
    }
  )
);