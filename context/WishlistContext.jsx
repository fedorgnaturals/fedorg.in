'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { wishlistAPI } from '@/lib/ecommerceAPI';
import { products as allProducts } from '@/data/mockData';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);

  const refresh = useCallback(async () => {
    const ids = await wishlistAPI.getItems();
    setWishlistIds(ids);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const wishlistProducts = wishlistIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const toggleWishlist = async (productId) => {
    const wasWishlisted = isWishlisted(productId);
    await wishlistAPI.toggle(productId);
    await refresh();
    const product = allProducts.find(p => p.id === productId);
    if (wasWishlisted) toast.success(`Removed from wishlist`, { icon: '💔' });
    else toast.success(`${product?.name ?? 'Item'} added to wishlist!`, { icon: '❤️' });
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, wishlistProducts, isWishlisted, toggleWishlist, count: wishlistIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};
