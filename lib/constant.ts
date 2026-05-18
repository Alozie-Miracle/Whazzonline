

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
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
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
  },
  {
    id: "prod_04",
    name: "Raw Linen Studio Blazer",
    description: "An unstructured, breathable layer tailored from organic premium linen for fluid everyday movement.",
    price: 310.00,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    stock: 12,
    rating: 4.7,
    reviewsCount: 34
  },
  {
    id: "prod_09",
    name: "Archival Obsidian Vase",
    description: "Hand-thrown volcanic clay vessel featuring a raw, textured matte finish to bring brutalist energy into modern interiors.",
    price: 240.00,
    imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop",
    category: "Curated",
    stock: 8,
    rating: 4.9,
    reviewsCount: 19
  },
  // Additional Curated Products
  {
    id: "prod_10",
    name: "Brutalist Concrete Desk Lamp",
    description: "Raw cast-concrete architectural base equipped with an adjustable brass cantilever and a warm-dimming LED element.",
    price: 185.00,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
    category: "Curated",
    stock: 14,
    rating: 4.6,
    reviewsCount: 22
  },
  {
    id: "prod_11",
    name: "Japanese Selvedge Denim Tote",
    description: "Heavyweight 14oz raw indigo selvedge denim utility container detailed with hand-hammered copper rivets and full-grain bridle leather handles.",
    price: 115.00,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    stock: 40,
    rating: 4.8,
    reviewsCount: 45
  },
  {
    id: "prod_12",
    name: "Merino Wool Modular Cardigan",
    description: "Spun from hyper-fine 100% extrafine merino wool fibers offering lightweight, thermoregulating insulation with a modern dropped-shoulder silhouette.",
    price: 265.00,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    stock: 18,
    rating: 4.7,
    reviewsCount: 29
  },
  {
    id: "prod_13",
    name: "Anodized Aluminum Fountain Pen",
    description: "Precision-milled aerospace grade aluminum shell weighted perfectly for effortless tactile writing, featuring an unyielding custom iridium nib.",
    price: 95.00,
    imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    stock: 65,
    rating: 4.9,
    reviewsCount: 71
  }
];


import { Order } from '../types';



export const MOCK_ORDER: Order = {
  id: "ord_9f8b7c6a5e4d",
  userId: "user_cl7x8y9z0000",
  status: "delivered",
  createdAt: 1779247200000,
  totalAmount: 1470.00,
  items: [
    {
      id: "prod_01",
      name: "Monolith Minimalist Timepiece",
      price: 850.00,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
      category: "Objects"
    },
    {
      id: "prod_04",
      name: "Raw Linen Studio Blazer",
      price: 310.00,
      quantity: 2,
      imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
      category: "Apparel"
    }
  ]
};

export const MOCK_ORDERS_LIST: Order[] = [
  MOCK_ORDER,
  {
    id: "ord_1a2b3c4d5e6f",
    userId: "user_cl7x8y9z0000",
    status: "pending",
    createdAt: 1779333600000,
    totalAmount: 240.00,
    items: [
      {
        id: "prod_09",
        name: "Archival Obsidian Vase",
        price: 240.00,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop",
        category: "Curated"
      }
    ]
  }
];