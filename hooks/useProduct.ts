import { useState, useCallback, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { 
    Product, 
    CartItem, 
    ProductsArrayResponse, 
    SingleProductResponse, 
    CartResponse, 
    WishlistResponse, 
    WaitList
} from '../types/';
import { useCartStore } from '@/store/cartstore';
import { useAuthStore } from '@/store/authstore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useProducts = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<WaitList>();
    const [product, setProduct] = useState<Product | null>(null);

    const clearError = useCallback(() => setError(null), []);
    const setCart = useCartStore((state) => state.setCart); // Select specific store actions to avoid global re-binds
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    // 1. Fetch all catalog products (supports optional category & search filter queries)
    const fetchAllProducts = useCallback(async (category?: string, search?: string): Promise<Product[]> => {
        setLoading(true);
        clearError();
        try {
            let url = '/products';
            const params = new URLSearchParams();
            
            if (category) params.append('category', category);
            if (search) params.append('search', search);
            
            const queryString = params.toString();
            if (queryString) url += `?${queryString}`;

            const response = await axiosClient.get<ProductsArrayResponse>(url);
            setProducts(response.data.products);
            return response.data.products;
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to sync product listings.';
            setError(msg);
            return [];
        } finally {
            setLoading(false);
        }
    }, [clearError]);

    // 2. Fetch an explicit product artifact by its MongoDB ID string
    const fetchProductById = useCallback(async (id: string): Promise<Product | null> => {
        setLoading(true);
        clearError();
        try {
            const response = await axiosClient.get<SingleProductResponse>(`/products/${id}`);
            setProduct(response.data.product);
            return response.data.product;
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Targeted product asset was not found.';
            setError(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }, [clearError]);

    // 3. Fetch products currently saved in the authenticated user's cart
    const fetchCartProducts = useCallback(async (): Promise<CartItem[]> => {
        setLoading(true);
        clearError();
        try {
            const response = await axiosClient.get<CartResponse>('/products/cart');
            const items = response.data.cart?.items || [];
            
            setCartItems(items);
            setCart(items); // Sync globally to Zustand store smoothly
            
            return items;
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Could not fetch your cart instances.';
            setError(msg);
            return [];
        } finally {
            setLoading(false);
        }
    }, [clearError, setCart]);

    // 4. Fetch products populated on the user's wishlist
    const fetchWishlistProducts = useCallback(async (): Promise<Product[]> => {
        setLoading(true);
        clearError();
        try {
            const response = await axiosClient.get<WishlistResponse>('/products/wishlist');
            setWishlist(response.data.wishlist);
            return response.data.wishlist?.products || [];
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Could not load wishlist preferences.';
            setError(msg);
            return [];
        } finally {
            setLoading(false);
        }
    }, [clearError]);

    // 5. Add a product to the authenticated user's cart
    const addProductToCart = useCallback(async (productId: string, quantity: number): Promise<boolean> => {
        if (!token) {
            router.push('/auth'); 
            return false;
        }

        setLoading(true);
        toast.loading('Adding item to cart...');
        clearError();
        try {
            await axiosClient.post('/products/add-cart', { productId, quantity });
            // Re-fetch updates to state safely
            await fetchCartProducts();
            toast.dismiss(); // Clear loading toast before showing success
            toast.success('Item added to cart!');
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to add item to your cart.';
            setError(msg);
            toast.dismiss();
            toast.error('Failed to add item to cart.');
            return false;
        } finally {
            setLoading(false);
        }
    }, [token, router, clearError, fetchCartProducts]);


    // 6. Toggle a product's presence on the user's wishlist
    const toggleWishlistProduct = useCallback(async (productId: string): Promise<boolean> => {
        if (!token) {
            router.push('/auth'); 
            return false;
        }

        toast.loading('Updating wishlist...');
        setLoading(true);
        clearError();
        try {
            await axiosClient.post('/products/add-wishlist', { productId });
            // Re-fetch updates to state safely
            await fetchWishlistProducts();
            toast.dismiss(); // Clear loading toast before showing success
            toast.success('Item added to wishlist!');
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to update your wishlist.';
            setError(msg);
            toast.dismiss();
            toast.error('Failed to add item to wishlist.');
            return false;
        } finally {
            setLoading(false);
        }
    }, [token, router, clearError, fetchWishlistProducts]);

    const checkout = useCallback(async (onSuccess?: (orderData: any) => void, address: { fullName: string; email: string, street: string, city: string, zip: string, country: string } = { fullName: '', email: '', street: '', city: '', zip: '', country: 'USA' }) => {
        
        setError(null);
        try {
        // Calls your POST /checkout route
            const response = await axiosClient.post('/products/checkout', { 
                name: address.fullName,
                email: address.email,
                address: address.street,
                city: address.city,
                postalCode: address.zip,
                country: address.country
            }); 
        
            if (response.status === 201) {
                // Run optional callback parameters (e.g., redirecting to an order success screen)
                if (onSuccess) {
                    onSuccess(response.data.order);
                }
            }
        } catch (err: any) {
            console.error("Transaction processing error:", err);
            const errorMessage = err.response?.data?.message || "Server error processing your checkout";
            setError(errorMessage);
            throw new Error(errorMessage); // Allows catching the error inside the UI component if needed
        } finally {
            
        }
    }, []);

    // // Isolation Effect: Triggers calls cleanly only when token lifecycle changes state
    // useEffect(() => {
    //     if (token) {
    //         fetchAllProducts();
    //         fetchCartProducts();
    //     }
    // }, [token, fetchAllProducts, fetchCartProducts]);

    return {
        loading,
        error,
        clearError,
        products,
        cartItems,
        wishlist,
        product,
        fetchAllProducts,
        fetchProductById,
        fetchCartProducts,
        fetchWishlistProducts,
        addProductToCart,
        toggleWishlistProduct,
        checkout
    };
};