import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Actions
  setCart: (items: CartItem[]) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Helper calculation pipeline to keep state properties dry and synchronized
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // 1. Hydrate the entire store smoothly from database response frames
      setCart: (items) => {
        set({
          items,
          ...calculateTotals(items),
        });
      },

      // 2. Client-side optimistic tracking for additions
      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product?._id === product._id
        );
        let updatedItems = [...currentItems];

        if (existingItemIndex > -1) {
          // Increment quantity safely if entry matches
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
        } else {
          // Push structurally pristine item mirroring the backend BSON schemas
          updatedItems.push({
            _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            product: product,
            quantity: quantity,
          });
        }

        set({
          items: updatedItems,
          ...calculateTotals(updatedItems),
        });
      },

      // 3. Purge item configurations by root product identifier string
      removeItem: (productId) => {
        const updatedItems = get().items.filter((item) => item.product?._id !== productId);
        set({
          items: updatedItems,
          ...calculateTotals(updatedItems),
        });
      },

      // 4. Update discrete specific row quantities from input changes or selector modifications
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return; // Prevent zero or negative item drops
        
        const updatedItems = get().items.map((item) =>
          item.product?._id === productId ? { ...item, quantity } : item
        );

        set({
          items: updatedItems,
          ...calculateTotals(updatedItems),
        });
      },

      // 5. Clean layout flush upon successful order creation or logout events
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'whazzonline-cart-storage', // Unique local storage key instance
      storage: createJSONStorage(() => localStorage),
    }
  )
);