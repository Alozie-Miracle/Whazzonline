import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WishlistState, Product } from '../types';


export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      addItemToWishlist: (product: Product) => {
        const { wishlistItems } = get();
        const exists = wishlistItems.some((item) => item._id === product._id);
        
        if (!exists) {
          set({ wishlistItems: [...wishlistItems, product] });
        }
      },

      removeItemFromWishlist: (id: string) => {
        set({
          wishlistItems: get().wishlistItems.filter((item) => item._id !== id),
        });
      },

      toggleWishlist: (id: string) => {
        const { wishlistItems, addItemToWishlist, removeItemFromWishlist } = get();
        const exists = wishlistItems.some((item) => item._id === id);

        if (exists) {
          removeItemFromWishlist(id);
        } else {
          // Fallback context: Find the artifact details from your system master list
          
        }
      },

      isInWishlist: (id: string) => {
        return get().wishlistItems.some((item) => item._id === id);
      },

      clearWishlist: () => set({ wishlistItems: [] }),
    }),
    {
      name: 'archive-wishlist-storage', // Isolated local storage namespace
      storage: createJSONStorage(() => localStorage),
    }
  )
);