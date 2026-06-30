import Link from 'next/link';
import { RefreshCw, CheckCircle, XCircle, Clock, Package, Mail, AlertCircle } from 'lucide-react';

const eligibleItems = [
  'Product received in damaged or broken condition',
  'Wrong product delivered (different from what was ordered)',
  'Product is expired or past its best-before date',
  'Product packaging is tampered or unsealed upon arrival',
  'Significant quality issue (e.g., foreign material found)',
];

const nonEligibleItems = [
  'Opened food products (for hygiene and safety reasons)',
  'Products returned after 7 days of delivery',
  'Products damaged due to improper storage by the customer',
  'Change of mind after opening the product',
  'Products without original packaging or missing labels',
];

const steps = [
  {
    step: '01',
    title: 'Raise a Request',
    desc: 'Email us at fedorg@fedorg.in within 7 days of delivery with your Order ID, photos of the product, and reason for return.',
  },
  {
    step: '02',
    title: 'Review & Approval',
    desc: 'Our team reviews your request within 1–2 business days and notifies you of the approval via email.',
  },
  {
    step: '03',
    title: 'Pickup Arranged',
    desc: 'We arrange a free pickup from your delivery address within 2 business days of approval.',
  },
  {
    step: '04',
    title: 'Inspection',
    desc: 'Once we receive the returned product, our team inspects it within 2 business days.',
  },
  {
    step: '05',
    title: 'Refund Processed',
    desc: 'Refund is initiated within 5–7 business days to your original payment method after inspection.',
  },
];

export default function ReturnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <RefreshCw className="w-8 h-8 text-primary-700" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Return & Refund <span className="text-primary-700">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg">We stand behind the quality of every product. If something's wrong, we'll make it right.</p>
          <p className="text-xs text-gray-400 mt-4">Last updated: 1 July 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Key Info Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Clock, title: '7-Day Window', desc: 'Returns accepted within 7 days of delivery' },
            { icon: RefreshCw, title: 'Free Pickup', desc: 'We collect the product from your doorstep' },
            { icon: CheckCircle, title: '5–7 Day Refund', desc: 'Refund credited to original payment method' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <p className="font-bold text-gray-900">{title}</p>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Eligibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-green-800">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-red-800">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-red-700">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Return</h2>
          <p className="text-gray-500 mb-8">Follow these simple steps to initiate a return.</p>
          <div className="relative space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 bg-primary-700 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{s.step}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{s.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Refund Methods */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Methods</h2>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-primary-700 text-white text-sm font-semibold px-6 py-3">
              <span>Payment Method</span>
              <span>Refund To</span>
              <span>Timeline</span>
            </div>
            <div className="divide-y divide-gray-100 text-sm">
              {[
                ['UPI / Net Banking', 'Original UPI / Bank Account', '3–5 business days'],
                ['Credit / Debit Card', 'Original Card', '5–7 business days'],
                ['Cash on Delivery', 'Bank Transfer (NEFT)', '5–7 business days'],
                ['Wallet', 'Original Wallet', '2–3 business days'],
              ].map(([method, to, time], i) => (
                <div key={i} className={`grid grid-cols-3 px-6 py-4 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}>
                  <span className="text-gray-700">{method}</span>
                  <span className="text-gray-700">{to}</span>
                  <span className="font-medium text-gray-900">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Damaged Product */}
        <section>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Received a Damaged Product?</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Please photograph the product and packaging immediately and email us at{' '}
                <a href="mailto:fedorg@fedorg.in" className="underline font-medium">fedorg@fedorg.in</a>{' '}
                within <strong>48 hours of delivery</strong>. We'll arrange a replacement or full refund with priority processing — no hassle, no questions asked.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Need help with a return?</h3>
          <p className="text-sm text-gray-500 mb-5">
            Email <a href="mailto:fedorg@fedorg.in" className="text-primary-700 font-medium">fedorg@fedorg.in</a> or call{' '}
            <a href="tel:7510209632" className="text-primary-700 font-medium">7510209632</a>. We respond within 24 hours.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">Contact Support</Link>
            <Link href="/faq#returns" className="btn-secondary">Return FAQs</Link>
          </div>
        </div>

      </div>
    </>
  );
}
