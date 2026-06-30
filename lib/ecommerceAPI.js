/**
 * E-commerce API layer — MongoDB backed via Next.js API routes
 * Falls back to localStorage when user is not logged in (guest mode)
 */

import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('fedorg_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  getItems: async () => {
    const userId = getUserId();
    if (userId) {
      const { data } = await api.get('/cart', { params: { userId } });
      return (data.data ?? []).map(item => ({
        product_id: item.product._id,
        quantity: item.qty,
        product: item.product,
      }));
    }
    return LS.get('fedorg_cart');
  },

  addItem: async (productId, quantity = 1) => {
    const userId = getUserId();
    if (userId) {
      await api.post('/cart', { userId, productId, qty: quantity });
      return;
    }
    const cart = LS.get('fedorg_cart');
    const existing = cart.find(i => i.product_id === productId);
    if (existing) existing.quantity += quantity;
    else cart.push({ product_id: productId, quantity });
    LS.set('fedorg_cart', cart);
  },

  updateQty: async (productId, quantity) => {
    const userId = getUserId();
    if (userId) {
      if (quantity <= 0) {
        await api.delete(`/cart?userId=${userId}&productId=${productId}`);
      } else {
        await api.post('/cart', { userId, productId, qty: quantity });
      }
      return;
    }
    let cart = LS.get('fedorg_cart');
    if (quantity <= 0) cart = cart.filter(i => i.product_id !== productId);
    else cart = cart.map(i => i.product_id === productId ? { ...i, quantity } : i);
    LS.set('fedorg_cart', cart);
  },

  removeItem: async (productId) => {
    const userId = getUserId();
    if (userId) {
      await api.delete(`/cart?userId=${userId}&productId=${productId}`);
      return;
    }
    LS.set('fedorg_cart', LS.get('fedorg_cart').filter(i => i.product_id !== productId));
  },

  clear: async () => {
    const userId = getUserId();
    if (userId) {
      await api.delete(`/cart?userId=${userId}`);
      return;
    }
    LS.set('fedorg_cart', []);
  },
};

// ─── Wishlist API ─────────────────────────────────────────────────────────────

export const wishlistAPI = {
  getItems: async () => {
    const userId = getUserId();
    if (userId) {
      const { data } = await api.get('/wishlist', { params: { userId } });
      return (data.data ?? []).map(item => item.product._id);
    }
    return LS.get('fedorg_wishlist');
  },

  add: async (productId) => {
    const userId = getUserId();
    if (userId) {
      await api.post('/wishlist', { userId, productId });
      return;
    }
    const list = LS.get('fedorg_wishlist');
    if (!list.includes(productId)) { list.push(productId); LS.set('fedorg_wishlist', list); }
  },

  remove: async (productId) => {
    const userId = getUserId();
    if (userId) {
      await api.delete(`/wishlist?userId=${userId}&productId=${productId}`);
      return;
    }
    LS.set('fedorg_wishlist', LS.get('fedorg_wishlist').filter(id => id !== productId));
  },

  toggle: async (productId) => {
    const userId = getUserId();
    if (userId) {
      const { data } = await api.post('/wishlist', { userId, productId });
      return data.action === 'added';
    }
    const list = LS.get('fedorg_wishlist');
    if (list.includes(productId)) {
      LS.set('fedorg_wishlist', list.filter(id => id !== productId));
      return false;
    } else {
      list.push(productId);
      LS.set('fedorg_wishlist', list);
      return true;
    }
  },
};

// ─── Order API ────────────────────────────────────────────────────────────────

export const orderAPI = {
  create: async (orderData) => {
    const userId = getUserId();
    const payload = { ...orderData, ...(userId ? { user: userId } : {}) };
    const { data } = await api.post('/orders', payload);
    return data.data;
  },

  getAll: async () => {
    const userId = getUserId();
    if (userId) {
      const { data } = await api.get('/orders', { params: { userId } });
      return data.data ?? [];
    }
    return LS.get('fedorg_orders');
  },

  getById: async (id) => {
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  },
};
