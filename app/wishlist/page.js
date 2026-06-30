'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-6">💛</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8">Save products you love and come back to them later.</p>
        <Link href="/products" className="btn-primary px-8 py-3 text-base">
          <Heart className="w-5 h-5" /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-500 text-sm mt-1">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map(product => {
          const inCart = isInCart(product.id);
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : null;

          return (
            <div key={product.id} className="card group">
              <div className="relative h-52 bg-gray-50">
                <Link href={`/products/${product.id}`}>
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </Link>
                {discount && product.inStock && (
                  <span className="absolute top-3 left-3 badge bg-red-100 text-red-600">-{discount}%</span>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-red-500" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">{product.category.replace('-', ' ')}</p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-primary-700 transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{product.unit}</p>

                <div className="flex items-baseline gap-1.5 mt-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>}
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock || inCart}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded-lg font-medium transition-colors ${
                      !product.inStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                      inCart ? 'bg-green-50 text-green-700 border border-green-200' :
                      'bg-primary-700 text-white hover:bg-primary-800'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {!product.inStock ? 'Sold Out' : inCart ? 'In Cart ✓' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/products" className="btn-secondary">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
