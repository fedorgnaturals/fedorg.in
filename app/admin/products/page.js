'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircle, Pencil, Trash2, Search, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { productsAPI } from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await productsAPI.getAll();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await productsAPI.delete(id);
      toast.success(`"${name}" deleted`);
      setProducts(products.filter(p => p.id !== id));
    } catch {
      toast.error('Delete failed. Try again.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/add" className="btn-primary"><PlusCircle className="w-4 h-4" />Add Product</Link>
      </div>
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading products…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><p className="text-4xl mb-3">📦</p><p className="text-gray-500">No products found.</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-5 py-3 text-gray-500 font-medium">Product</th>
                <th className="px-5 py-3 text-gray-500 font-medium">Category</th>
                <th className="px-5 py-3 text-gray-500 font-medium">Price</th>
                <th className="px-5 py-3 text-gray-500 font-medium">Rating</th>
                <th className="px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-5 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 capitalize">{p.category.replace('-', ' ')}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">₹{p.price}</div>
                    {p.originalPrice && <div className="text-xs text-gray-400 line-through">₹{p.originalPrice}</div>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
                      <span className="text-gray-700">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/edit/${p.id}`} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.name)} disabled={deleting === p.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
