'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productsAPI } from '@/lib/api';
import { categories } from '@/data/mockData';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productsAPI.getAll({ category: activeCategory, search });
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, search]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-heading">All Products</h1>
        <p className="section-sub">Pure food, directly from Indian farms</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-9 pr-9" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field w-auto text-sm">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {!loading && <p className="text-sm text-gray-500 mb-4">{sorted.length} product{sorted.length !== 1 ? 's' : ''} found</p>}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-80" />)}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🌾</p>
          <p className="text-gray-500 text-lg">No products found.</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="mt-4 btn-secondary text-sm">Clear filters</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
