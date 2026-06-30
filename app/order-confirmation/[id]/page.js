"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  ArrowRight,
  Download,
} from "lucide-react";
import { orderAPI } from "@/lib/ecommerceAPI";

const STATUS_STEPS = [
  { label: "Order Confirmed", icon: CheckCircle, done: true },
  { label: "Packing", icon: Package, done: true },
  { label: "Out for Delivery", icon: Truck, done: false },
  { label: "Delivered", icon: MapPin, done: false },
];

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI
      .getById(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto" />
          <div className="h-6 bg-gray-100 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Order not found.</p>
        <Link href="/" className="btn-primary mt-4">
          Go Home
        </Link>
      </div>
    );
  }

  const createdAt = new Date(order.created_at);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Success banner */}
      <div className="bg-gradient-to-br from-primary-50 to-green-50 rounded-3xl p-8 text-center mb-8 border border-primary-100">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-600">
          Thank you, <strong>{order.shipping?.fullName}</strong>! Your order has
          been placed successfully.
        </p>
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 mt-4 text-sm">
          <span className="text-gray-500">Order ID:</span>
          <span className="font-mono font-semibold text-gray-900">
            {order.id}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Placed on{" "}
          {createdAt.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          at{" "}
          {createdAt.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Tracking */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-6">Order Status</h2>
        <div className="flex items-start gap-0">
          {STATUS_STEPS.map(({ label, icon: Icon, done }, i) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 z-10 ${done ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-300"}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className={`absolute h-0.5 w-full top-4 left-1/2 ${done && STATUS_STEPS[i + 1]?.done ? "bg-primary-600" : "bg-gray-100"}`}
                />
              )}
              <p
                className={`text-xs font-medium ${done ? "text-primary-700" : "text-gray-400"}`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Expected delivery:{" "}
          <strong className="text-gray-900">
            {new Date(
              createdAt.getTime() + 3 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
            })}{" "}
            –{" "}
            {new Date(
              createdAt.getTime() + 5 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
          </strong>
        </p>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {order.items?.map((item, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{order.subtotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery</span>
            <span className={order.delivery_fee === 0 ? "text-green-600" : ""}>
              {order.delivery_fee === 0 ? "FREE" : `₹${order.delivery_fee}`}
            </span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
            <span>Total Paid</span>
            <span>₹{order.total?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Delivery address */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">Deliver To</h2>
        <p className="font-medium text-gray-900">{order.shipping?.fullName}</p>
        <p className="text-sm text-gray-500 mt-1">
          {order.shipping?.address}, {order.shipping?.city},{" "}
          {order.shipping?.state} — {order.shipping?.pincode}
        </p>
        <p className="text-sm text-gray-500">
          {order.shipping?.phone} · {order.shipping?.email}
        </p>
        <div className="inline-flex items-center gap-1.5 mt-3 text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full">
          Payment:{" "}
          <strong className="capitalize">
            {order.payment_method === "cod"
              ? "Cash on Delivery"
              : order.payment_method?.toUpperCase()}
          </strong>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/products"
          className="btn-primary flex-1 justify-center py-3"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-secondary flex-1 justify-center py-3"
        >
          <Download className="w-4 h-4" /> Save Receipt
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        Questions? Email us at{" "}
        <a
          href="mailto:fedorg@fedorg.in"
          className="text-primary-600 hover:underline"
        >
          fedorg@fedorg.in
        </a>
      </p>
    </div>
  );
}
