
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  countInStock: number;
  stock: number;
  rating?: number;
  reviewsCount?: number
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface WishlistState {
  wishlistItems: Product[];
  addItemToWishlist: (product: Product) => void;
  removeItemFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}



export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  photoURL: string;
  createdAt: number;
}


// Inferred from dashboard usage: matches the items nested in your Order structure
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}




export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface CartResponse {
    success: boolean;
    cart: {
        _id: string;
        user: string;
        items: CartItem[];
    };
}

export interface WishlistResponse {
    success: boolean;
    wishlist: {
        _id: string;
        user: string;
        products: Product[];
    };
}

export interface ProductsArrayResponse {
    success: boolean;
    count: number;
    products: Product[];
}

export interface SingleProductResponse {
    success: boolean;
    product: Product;
}



export interface WaitList {
  _id?: string;
  user: string;
  products: Product[]; 
}


export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  _id?: string;
  product: Product; // Fully hydrated product model populated from your backend lookup
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  _id: string;
  user: string; // User ID reference string
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  purchaseDate: string; // ISO Date String format from mongoose timestamps
  createdAt: string;
  updatedAt: string;
}

// Structuring the API route response payload schema wrap
export interface OrdersResponse {
  success: boolean;
  count: number;
  orders: Order[];
}

export interface SingleOrderResponse {
  success: boolean;
  order: Order;
}