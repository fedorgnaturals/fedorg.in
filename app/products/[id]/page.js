"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { productsAPI } from "@/lib/api";
import { products as allProducts } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    productsAPI
      .getById(id)
      .then(setProduct)
      .catch(() => router.push("/products"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const related = allProducts
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  const discount = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const faqs = [
    {
      q: "Is this product organic?",
      a: "Yes, all FEDORG products are sourced from farms that avoid synthetic pesticides and fertilizers.",
    },
    {
      q: "What is the shelf life?",
      a: "Shelf life varies by product and is printed on the packaging. Typically 6–12 months from the manufacturing date.",
    },
    {
      q: "Do you offer bulk orders?",
      a: "Yes! Contact us at fedorg@fedorg.in for bulk pricing.",
    },
  ];

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-100 rounded-2xl h-96" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded h-8 w-3/4" />
            ))}
          </div>
        </div>
      </div>
    );

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary-700">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">
          {product.name}
        </span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="relative rounded-2xl overflow-hidden bg-gray-50 h-96 lg:h-[500px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {discount && product.inStock && (
            <span className="absolute top-4 left-4 badge bg-red-100 text-red-600 text-sm px-3 py-1">
              -{discount}% OFF
            </span>
          )}
        </div>

        <div>
          <p className="text-sm text-primary-600 font-semibold uppercase tracking-wide mb-2">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 text-sm mt-1">{product.unit}</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-accent-500 fill-accent-500" : "text-gray-200 fill-gray-200"}`}
                />
              ))}
            </div>
            <span className="font-semibold text-sm text-gray-700">
              {product.rating}
            </span>
            <span className="text-sm text-gray-400">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-4xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {discount && (
              <span className="badge bg-green-100 text-green-700 text-sm">
                Save {discount}%
              </span>
            )}
          </div>
          <ul className="mt-5 space-y-1.5">
            {product.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Check className="w-4 h-4 text-primary-600 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex items-center gap-4 flex-wrap">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50 font-bold text-lg"
              >
                −
              </button>
              <span className="px-4 py-2 font-semibold text-gray-900 min-w-[40px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50 font-bold text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                toast.success(`${product.name} (×${qty}) added to cart!`)
              }
              disabled={!product.inStock}
              className={`flex-1 justify-center btn-primary py-3 text-base ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`p-3 rounded-lg border transition-colors ${wishlist ? "border-red-300 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:text-red-400"}`}
            >
              <Heart className={`w-5 h-5 ${wishlist ? "fill-red-500" : ""}`} />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: Truck, label: "Free Delivery", sub: "Orders > ₹500" },
              { icon: ShieldCheck, label: "Lab Tested", sub: "Every batch" },
              {
                icon: RotateCcw,
                label: "7-Day Returns",
                sub: "If unsatisfied",
              },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <Icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12 max-w-3xl">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          About this product
        </h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="mb-16 max-w-3xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {q}
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <button onClick={() => router.back()} className="btn-secondary text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>
      </div>
    </div>
  );
}
