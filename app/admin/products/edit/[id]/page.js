'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import { productsAPI } from '@/lib/api';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI.getById(id)
      .then(setProduct)
      .catch(() => router.push('/admin/products'))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return (
    <div className="p-8">
      <div className="max-w-2xl space-y-4 animate-pulse">
        {[1,2,3].map(i => <div key={i} className="bg-gray-100 rounded-2xl h-40" />)}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 text-sm mt-1">Update the product details below.</p>
      </div>
      {product && <ProductForm initialData={product} />}
    </div>
  );
}
