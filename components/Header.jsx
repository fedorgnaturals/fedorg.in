"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/teams", label: "Our Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="bg-primary-700 text-white text-sm py-1.5 text-center tracking-wide">
        🌿 Free delivery on orders over ₹500 | 100% Natural &amp; Pure
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FEDORG Naturals"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary-700 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700 font-medium transition-colors"
            >
              <User className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden md:block btn-primary text-sm px-4 py-2"
            >
              Sign Up
            </Link>
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-600 hover:text-primary-700 transition-colors hidden md:block"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 font-medium py-2 hover:text-primary-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex gap-3">
            <Link
              href="/login"
              className="btn-secondary text-sm flex-1 justify-center"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-primary text-sm flex-1 justify-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
