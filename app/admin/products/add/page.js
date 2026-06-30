import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

export default function AddProductPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details to list a new product.</p>
      </div>
      <ProductForm />
    </div>
  );
}
