'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Check, ChevronRight, Loader2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { orderAPI } from '@/lib/ecommerceAPI';

const STEPS = ['Shipping', 'Review', 'Payment'];
const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 500;

const defaultShipping = {
  fullName: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState(defaultShipping);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // ── Step 1 validation ──────────────────────────────────────────────────────
  const validateShipping = () => {
    const e = {};
    if (!shipping.fullName.trim()) e.fullName = 'Required';
    if (!/\S+@\S+\.\S+/.test(shipping.email)) e.email = 'Invalid email';
    if (!/^\d{10}$/.test(shipping.phone)) e.phone = 'Enter valid 10-digit number';
    if (!shipping.address.trim()) e.address = 'Required';
    if (!shipping.city.trim()) e.city = 'Required';
    if (!shipping.state.trim()) e.state = 'Required';
    if (!/^\d{6}$/.test(shipping.pincode)) e.pincode = 'Enter valid 6-digit pincode';
    return e;
  };

  const handleNext = () => {
    if (step === 0) {
      const errs = validateShipping();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
    }
    setStep(s => s + 1);
  };

  // ── Place order ────────────────────────────────────────────────────────────
  const placeOrder = async () => {
    setPlacing(true);
    try {
      const order = await orderAPI.create({
        items: cartItems.map(({ product_id, quantity, product }) => ({
          product_id, quantity, name: product.name, price: product.price, image: product.image,
        })),
        shipping,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        payment_method: paymentMethod,
      });
      await clearCart();
      toast.success('Order placed successfully! 🎉');
      router.push(`/order-confirmation/${order.id}`);
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0 && step === 0) {
    router.push('/cart');
    return null;
  }

  const sf = (key) => ({
    value: shipping[key],
    onChange: e => setShipping(s => ({ ...s, [key]: e.target.value })),
    className: `input-field ${errors[key] ? 'border-red-400' : ''}`,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i < step ? 'bg-primary-700 text-white' :
              i === step ? 'bg-primary-700 text-white ring-4 ring-primary-100' :
              'bg-gray-100 text-gray-400'
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main panel */}
        <div className="lg:col-span-2">

          {/* ── Step 0: Shipping ─────────────────────────────────────────── */}
          {step === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary-600" /> Shipping Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" placeholder="Arjun Sharma" {...sf('fullName')} />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" placeholder="you@example.com" {...sf('email')} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input type="tel" placeholder="9876543210" {...sf('phone')} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address *</label>
                <input type="text" placeholder="House no., Street, Area" {...sf('address')} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                  <input type="text" placeholder="Chennai" {...sf('city')} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
                  <input type="text" placeholder="Tamil Nadu" {...sf('state')} />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode *</label>
                  <input type="text" placeholder="600001" maxLength={6} {...sf('pincode')} />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 1: Review ───────────────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 text-lg mb-4">Order Items</h2>
                <div className="space-y-4">
                  {cartItems.map(({ product, product_id, quantity }) => (
                    <div key={product_id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.unit} × {quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{(product.price * quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 text-lg mb-3">Deliver To</h2>
                <p className="text-gray-700 font-medium">{shipping.fullName}</p>
                <p className="text-sm text-gray-500 mt-1">{shipping.address}, {shipping.city}, {shipping.state} — {shipping.pincode}</p>
                <p className="text-sm text-gray-500">{shipping.phone} · {shipping.email}</p>
                <button onClick={() => setStep(0)} className="text-primary-600 text-sm hover:underline mt-2">Edit</button>
              </div>
            </div>
          )}

          {/* ── Step 2: Payment ──────────────────────────────────────────── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600" /> Payment Method
              </h2>
              {[
                { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: '💵' },
                { id: 'upi', label: 'UPI / GPay / PhonePe', sub: 'Pay instantly via UPI', icon: '📱' },
                { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: '💳' },
              ].map(({ id, label, sub, icon }) => (
                <label key={id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === id ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id)} className="accent-primary-700" />
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </label>
              ))}
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                All payments are 100% secure and encrypted
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1 justify-center py-3">
                ← Back
              </button>
            )}
            {step < 2 ? (
              <button onClick={handleNext} className="btn-primary flex-1 justify-center py-3">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={placeOrder} disabled={placing} className="btn-primary flex-1 justify-center py-3 text-base">
                {placing ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</> : '🎉 Place Order'}
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map(({ product, product_id, quantity }) => (
                <div key={product_id} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{product.name} ×{quantity}</span>
                  <span className="font-medium text-gray-900 shrink-0">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium text-gray-900'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
