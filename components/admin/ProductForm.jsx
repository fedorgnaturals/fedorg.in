'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { productsAPI } from '@/lib/api';
import { categories } from '@/data/mockData';

const defaultForm = {
  name: '', category: 'grains', price: '', originalPrice: '', unit: '500 g',
  description: '', image: '', inStock: true, badge: '', features: [''],
};

export default function ProductForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(initialData || defaultForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.image.trim()) e.image = 'Image URL is required';
    return e;
  };

  const handleFeatureChange = (i, val) => {
    const feats = [...form.features]; feats[i] = val; setForm({ ...form, features: feats });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : null, features: form.features.filter(Boolean) };
      if (isEdit) { await productsAPI.update(initialData.id, payload); toast.success('Product updated!'); }
      else { await productsAPI.create(payload); toast.success('Product added!'); }
      router.push('/admin/products');
    } catch {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-lg">Basic Information</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Organic Brown Rice" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
              {categories.filter(c => c.id !== 'all').map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit / Pack Size</label>
            <input type="text" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} placeholder="e.g. 500 g, 1 kg" className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Describe the product…" className={`input-field resize-none ${errors.description ? 'border-red-400' : ''}`} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-lg">Pricing</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Selling Price (₹) *</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="149" className={`input-field ${errors.price ? 'border-red-400' : ''}`} />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Original / MRP (₹)</label>
            <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="199" className="input-field" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 text-lg">Media</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL *</label>
          <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/…" className={`input-field ${errors.image ? 'border-red-400' : ''}`} />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>
        {form.image && (
          <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 text-lg">Key Features</h2>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={f} onChange={e => handleFeatureChange(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="input-field flex-1" />
            {form.features.length > 1 && (
              <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })} className="p-2 text-red-400 hover:text-red-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setForm({ ...form, features: [...form.features, ''] })} className="btn-secondary text-sm">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 text-lg">Status</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Badge (optional)</label>
            <select value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className="input-field">
              <option value="">No badge</option>
              <option value="Bestseller">Bestseller</option>
              <option value="New">New</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-7">
            <input type="checkbox" id="inStock" checked={form.inStock} onChange={e => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4 accent-primary-700" />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {isEdit ? 'Saving…' : 'Adding…'}</> : isEdit ? 'Save Changes' : 'Add Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary px-8 py-3">Cancel</button>
      </div>
    </form>
  );
}
