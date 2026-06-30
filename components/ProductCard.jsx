'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const badgeColors = {
  Bestseller: 'bg-accent-100 text-accent-700',
  'Top Rated': 'bg-primary-100 text-primary-700',
  New: 'bg-blue-100 text-blue-700',
  'Out of Stock': 'bg-gray-100 text-gray-500',
};

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="card group">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="relative h-52 bg-gray-50">
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
          {product.badge && (
            <span className={`absolute top-3 left-3 badge ${badgeColors[product.badge] || 'bg-gray-100 text-gray-600'}`}>{product.badge}</span>
          )}
          {discount && product.inStock && (
            <span className="absolute top-3 right-3 badge bg-red-100 text-red-600">-{discount}%</span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="absolute bottom-3 right-3 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">{product.category.replace('-', ' ')}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary-700 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">{product.unit}</p>
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>}
          </div>
          <button
            onClick={() => product.inStock && !inCart && addToCart(product.id)}
            disabled={!product.inStock || inCart}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              !product.inStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
              inCart ? 'bg-green-50 text-green-700 border border-green-200' :
              'bg-primary-700 text-white hover:bg-primary-800'
            }`}>
            <ShoppingCart className="w-3.5 h-3.5" />
            {!product.inStock ? 'Sold Out' : inCart ? 'In Cart ✓' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
