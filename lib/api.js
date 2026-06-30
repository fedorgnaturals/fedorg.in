import axios from 'axios';
import { products } from '@/data/mockData';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.fedorg.in/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('fedorg_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));
let mockProducts = [...products];

export const authAPI = {
  login: async (email, password) => {
    await delay();
    // TODO: replace with → api.post('/auth/login', { email, password })
    if (email && password) return { token: 'mock_token_xyz', user: { id: '1', name: 'Admin', email } };
    throw new Error('Invalid credentials');
  },
  signup: async (name, email, password) => {
    await delay();
    // TODO: replace with → api.post('/auth/signup', { name, email, password })
    return { token: 'mock_token_xyz', user: { id: '2', name, email } };
  },
  logout: () => {
    localStorage.removeItem('fedorg_token');
    localStorage.removeItem('fedorg_user');
  },
};

export const productsAPI = {
  getAll: async (filters = {}) => {
    await delay();
    // TODO: replace with → api.get('/products', { params: filters })
    let result = [...mockProducts];
    if (filters.category && filters.category !== 'all') result = result.filter(p => p.category === filters.category);
    if (filters.search) { const q = filters.search.toLowerCase(); result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
    return result;
  },
  getById: async (id) => {
    await delay();
    // TODO: replace with → api.get(`/products/${id}`)
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },
  create: async (data) => {
    await delay();
    // TODO: replace with → api.post('/products', data)
    const newProduct = { ...data, id: String(Date.now()), rating: 0, reviewCount: 0 };
    mockProducts.push(newProduct);
    return newProduct;
  },
  update: async (id, data) => {
    await delay();
    // TODO: replace with → api.put(`/products/${id}`, data)
    mockProducts = mockProducts.map(p => p.id === id ? { ...p, ...data } : p);
    return mockProducts.find(p => p.id === id);
  },
  delete: async (id) => {
    await delay();
    // TODO: replace with → api.delete(`/products/${id}`)
    mockProducts = mockProducts.filter(p => p.id !== id);
    return { success: true };
  },
};

export default api;
