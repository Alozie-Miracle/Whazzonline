

import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Whazz-X Wireless Headphones',
    description: 'Premium noise-canceling headphones with 40-hour battery life and studio-quality sound.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    category: 'Electronics',
    stock: 50,
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: 'p2',
    name: 'BlawDigital Smart Watch',
    description: 'Track your fitness, heart rate, and notifications with the sleek BlawDigital Smart Watch.',
    price: 149.50,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    category: 'Electronics',
    stock: 30,
    rating: 4.5,
    reviewsCount: 89
  },
  {
    id: 'p3',
    name: 'Minimalist Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID protection and slim design.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    category: 'Accessories',
    stock: 100,
    rating: 4.9,
    reviewsCount: 56
  },
  {
    id: 'p4',
    name: 'Tech Backpack G2',
    description: 'Water-resistant backpack with a dedicated laptop compartment and USB charging port.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?q=80&w=1000&auto=format&fit=crop',
    category: 'Lifestyle',
    stock: 25,
    rating: 4.7,
    reviewsCount: 210
  },
  {
    id: 'p5',
    name: 'Ergonomic Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches for ultimate typing comfort.',
    price: 129.00,
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
    category: 'Computing',
    stock: 15,
    rating: 4.6,
    reviewsCount: 78
  },
  {
    id: 'p6',
    name: 'Bluetooth Studio Speakers',
    description: 'Compact yet powerful studio monitors with crystal clear highs and deep bass.',
    price: 299.00,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
    category: 'Audio',
    stock: 10,
    rating: 4.9,
    reviewsCount: 42
  }
];