/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number;
  reviewsCount?: number;
}

export interface WishlistState {
  wishlistItems: Product[];
  addItemToWishlist: (product: Product) => void;
  removeItemFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}