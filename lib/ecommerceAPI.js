/**
 * E-commerce API layer
 * Uses Supabase when configured, falls back to localStorage otherwise.
 * All functions are async so swapping to Supabase is seamless.
 */

import { supabase } from './supabase';

// ─── Helpers ────────────────────────────────────────────────────────────────

const LS = {
  get: (key, fallback = []) => {
    if (typeof window === 'undefined') return fallback;
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set: (key, val) => {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(val));
  },
};

const getUserId = () => {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem('fedorg_user'))?.id ?? null; } catch { return null; }
};

// ─── Cart API ────────────────────────────────────────────────────────────────

export const cartAPI = {
  /** Load cart items [{product_id, quantity}] */
  getItems: async () => {
    if (supabase) {
      const userId = getUserId();
      if (!userId) return LS.get('fedorg_cart');
      const { data } = await supabase.from('cart_items').select('*').eq('user_id', userId);
      return data ?? [];
    }
    return LS.get('fedorg_cart');
  },

  /** Add or increment a product */
  addItem: async (productId, quantity = 1) => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        await supabase.from('cart_items').upsert(
          { user_id: userId, product_id: productId, quantity },
          { onConflict: 'user_id,product_id', ignoreDuplicates: false }
        );
        return;
      }
    }
    const cart = LS.get('fedorg_cart');
    const existing = cart.find(i => i.product_id === productId);
    if (existing) existing.quantity += quantity;
    else cart.push({ product_id: productId, quantity });
    LS.set('fedorg_cart', cart);
  },

  /** Update quantity; removes item if qty <= 0 */
  updateQty: async (productId, quantity) => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        if (quantity <= 0) {
          await supabase.from('cart_items').delete().match({ user_id: userId, product_id: productId });
        } else {
          await supabase.from('cart_items').update({ quantity }).match({ user_id: userId, product_id: productId });
        }
        return;
      }
    }
    let cart = LS.get('fedorg_cart');
    if (quantity <= 0) cart = cart.filter(i => i.product_id !== productId);
    else cart = cart.map(i => i.product_id === productId ? { ...i, quantity } : i);
    LS.set('fedorg_cart', cart);
  },

  /** Remove a single item */
  removeItem: async (productId) => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        await supabase.from('cart_items').delete().match({ user_id: userId, product_id: productId });
        return;
      }
    }
    const cart = LS.get('fedorg_cart').filter(i => i.product_id !== productId);
    LS.set('fedorg_cart', cart);
  },

  /** Clear the entire cart */
  clear: async () => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        await supabase.from('cart_items').delete().eq('user_id', userId);
        return;
      }
    }
    LS.set('fedorg_cart', []);
  },
};

// ─── Wishlist API ─────────────────────────────────────────────────────────────

export const wishlistAPI = {
  getItems: async () => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        const { data } = await supabase.from('wishlist_items').select('product_id').eq('user_id', userId);
        return (data ?? []).map(r => r.product_id);
      }
    }
    return LS.get('fedorg_wishlist');
  },

  add: async (productId) => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        await supabase.from('wishlist_items').upsert({ user_id: userId, product_id: productId }, { onConflict: 'user_id,product_id' });
        return;
      }
    }
    const list = LS.get('fedorg_wishlist');
    if (!list.includes(productId)) { list.push(productId); LS.set('fedorg_wishlist', list); }
  },

  remove: async (productId) => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        await supabase.from('wishlist_items').delete().match({ user_id: userId, product_id: productId });
        return;
      }
    }
    LS.set('fedorg_wishlist', LS.get('fedorg_wishlist').filter(id => id !== productId));
  },

  toggle: async (productId) => {
    const list = await wishlistAPI.getItems();
    if (list.includes(productId)) await wishlistAPI.remove(productId);
    else await wishlistAPI.add(productId);
    return !list.includes(productId); // returns new state (true = wishlisted)
  },
};

// ─── Order API ────────────────────────────────────────────────────────────────

export const orderAPI = {
  /** Place an order; returns the created order object */
  create: async (orderData) => {
    if (supabase) {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('orders')
        .insert({ ...orderData, user_id: userId })
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    // localStorage fallback
    const order = { ...orderData, id: `ORD-${Date.now()}`, status: 'confirmed', created_at: new Date().toISOString() };
    const orders = LS.get('fedorg_orders');
    orders.unshift(order);
    LS.set('fedorg_orders', orders);
    return order;
  },

  /** Get all orders for the current user */
  getAll: async () => {
    if (supabase) {
      const userId = getUserId();
      if (userId) {
        const { data } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        return data ?? [];
      }
    }
    return LS.get('fedorg_orders');
  },

  /** Get a single order by ID */
  getById: async (id) => {
    if (supabase) {
      const { data } = await supabase.from('orders').select('*').eq('id', id).single();
      return data;
    }
    return LS.get('fedorg_orders').find(o => o.id === id) ?? null;
  },
};
