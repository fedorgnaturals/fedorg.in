'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 500;

export default function CartPage() {
  const { cartItems, itemCount, subtotal, updateQty, removeItem, loading } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="btn-primary px-8 py-3 text-base">
          <ShoppingBag className="w-5 h-5" /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart</h1>
      <p className="text-gray-500 text-sm mb-8">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(({ product, product_id, quantity }) => (
            <div key={product_id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:shadow-sm transition-shadow">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs text-primary-600 font-medium uppercase tracking-wide">{product.category.replace('-', ' ')}</p>
                    <Link href={`/products/${product.id}`} className="font-semibold text-gray-900 hover:text-primary-700 transition-colors line-clamp-1">
                      {product.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">{product.unit}</p>
                  </div>
                  <button onClick={() => removeItem(product_id)} className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {/* Qty controls */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(product_id, quantity - 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 min-w-[32px] text-center">{quantity}</span>
                    <button onClick={() => updateQty(product_id, quantity + 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{(product.price * quantity).toLocaleString()}</p>
                    {quantity > 1 && <p className="text-xs text-gray-400">₹{product.price} each</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-800 font-medium mt-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-5">Order Summary</h2>

            {/* Free delivery banner */}
            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 mb-5 text-sm">
                <div className="flex items-center gap-2 text-primary-700 font-medium mb-1.5">
                  <Tag className="w-4 h-4" />
                  Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery!
                </div>
                <div className="w-full bg-primary-100 rounded-full h-1.5">
                  <div className="bg-primary-600 h-1.5 rounded-full transition-all" style={{ width: `${Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            {deliveryFee === 0 && (
              <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-5 text-sm text-green-700 font-medium flex items-center gap-2">
                🎉 You qualify for free delivery!
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium text-gray-900'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full justify-center mt-6 py-3 text-base">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-center text-xs text-gray-400 mt-3">
              Secure checkout · Encrypted payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
