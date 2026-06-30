import Link from 'next/link';
import { Package, PlusCircle, Star, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { products } from '@/data/mockData';

const totalProducts = products.length;
const inStock = products.filter(p => p.inStock).length;
const avgRating = (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1);

const stats = [
  { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-blue-50 text-blue-600' },
  { label: 'In Stock', value: inStock, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  { label: 'Avg Rating', value: avgRating, icon: Star, color: 'bg-accent-50 text-accent-600' },
  { label: 'Customers', value: '12K+', icon: Users, color: 'bg-purple-50 text-purple-600' },
];

const quickActions = [
  { label: 'Add Product', href: '/admin/products/add', icon: PlusCircle, color: 'bg-primary-700 text-white hover:bg-primary-800' },
  { label: 'View Products', href: '/admin/products', icon: Package, color: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' },
  { label: 'View Store', href: '/products', icon: ShoppingCart, color: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s an overview.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, href, icon: Icon, color }) => (
            <Link key={href} href={href} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${color}`}>
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-700">Recent Products</h2>
          <Link href="/admin/products" className="text-sm text-primary-600 hover:underline">View all →</Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Product</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Category</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Price</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-5 py-3 text-gray-500 capitalize">{p.category.replace('-', ' ')}</td>
                  <td className="px-5 py-3 text-gray-900">₹{p.price}</td>
                  <td className="px-5 py-3">
                    <span className={`badge ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
