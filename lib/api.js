import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('fedorg_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ─────────────────────────────────────────────
export const authAPI = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('fedorg_token', data.data.token);
      localStorage.setItem('fedorg_user', JSON.stringify(data.data.user));
    }
    return data.data;
  },

  signup: async (name, email, password) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    if (data.success) {
      localStorage.setItem('fedorg_token', data.data.token);
      localStorage.setItem('fedorg_user', JSON.stringify(data.data.user));
    }
    return data.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fedorg_token');
      localStorage.removeItem('fedorg_user');
    }
  },

  getUser: () => {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem('fedorg_user')); } catch { return null; }
  },
};

// ─── Products ─────────────────────────────────────────
export const productsAPI = {
  getAll: async (filters = {}) => {
    const params = {};
    if (filters.category && filters.category !== 'all') params.category = filters.category;
    const { data } = await api.get('/products', { params });
    return data.data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },

  create: async (productData) => {
    const { data } = await api.post('/products', productData);
    return data.data;
  },

  update: async (id, productData) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data.data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};

export default api;
