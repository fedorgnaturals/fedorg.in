'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { cartAPI } from '@/lib/ecommerceAPI';
import { products as allProducts } from '@/data/mockData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // [{product_id, quantity}]
  const [loading, setLoading] = useState(true);

  // Hydrate from API/localStorage
  const refresh = useCallback(async () => {
    const items = await cartAPI.getItems();
    setCartItems(items);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Enrich cart items with product data
  const enriched = cartItems.map(item => {
    const product = allProducts.find(p => p.id === item.product_id);
    return product ? { ...item, product } : null;
  }).filter(Boolean);

  const itemCount = enriched.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = enriched.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const addToCart = async (productId, qty = 1) => {
    await cartAPI.addItem(productId, qty);
    await refresh();
    const product = allProducts.find(p => p.id === productId);
    toast.success(`${product?.name ?? 'Item'} added to cart!`, { icon: '🛒' });
  };

  const updateQty = async (productId, quantity) => {
    await cartAPI.updateQty(productId, quantity);
    await refresh();
  };

  const removeItem = async (productId) => {
    await cartAPI.removeItem(productId);
    await refresh();
    toast.success('Item removed from cart');
  };

  const clearCart = async () => {
    await cartAPI.clear();
    setCartItems([]);
  };

  const isInCart = (productId) => cartItems.some(i => i.product_id === productId);

  return (
    <CartContext.Provider value={{ cartItems: enriched, itemCount, subtotal, loading, addToCart, updateQty, removeItem, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
