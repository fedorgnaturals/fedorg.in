'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Orders & Payments',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Simply browse our products, add items to your cart, and proceed to checkout. You can pay via Cash on Delivery, UPI, or Credit/Debit card. Once your order is confirmed, you\'ll receive a confirmation email.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placing them. After that, the order may have already been dispatched. Contact us at fedorg@fedorg.in or call 7510209632 as soon as possible.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and Credit/Debit cards (Visa, Mastercard, RuPay).',
      },
      {
        q: 'Is it safe to make payments on your website?',
        a: 'Absolutely. Our website uses SSL encryption to protect your payment information. We do not store your card details on our servers.',
      },
      {
        q: 'Will I get an invoice for my order?',
        a: 'Yes, a digital invoice is included with every order and can also be downloaded from your order confirmation page.',
      },
    ],
  },
  {
    category: 'Products & Quality',
    items: [
      {
        q: 'Are your products 100% natural?',
        a: 'Yes. FEDORG Naturals products are sourced directly from trusted farmers and are free from artificial colours, flavours, and preservatives. We follow strict quality checks at every stage.',
      },
      {
        q: 'Where do you source your spices and grains?',
        a: 'We work directly with farmers across Tamil Nadu, Kerala, Rajasthan, and Madhya Pradesh. Our direct farm-to-table approach ensures freshness and fair prices for farmers.',
      },
      {
        q: 'Is your peanut butter made with added sugar or oil?',
        a: 'Our natural peanut butter variants contain only roasted peanuts with no added sugar, oil, or preservatives. Check the individual product label for variant-specific ingredients.',
      },
      {
        q: 'How long do your products stay fresh?',
        a: 'Shelf life varies by product. Spices typically last 12–18 months, food grains 6–12 months, and peanut butter 6 months from manufacture date. All best-before dates are printed on packaging.',
      },
      {
        q: 'Do you offer organic certified products?',
        a: 'Several of our products are in the process of obtaining FSSAI organic certification. Products that are currently certified are clearly labelled on the product page.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 3–5 business days across India. Metro cities (Chennai, Mumbai, Delhi, Bengaluru) typically receive orders within 2–3 business days.',
      },
      {
        q: 'Do you offer free delivery?',
        a: 'Yes! Orders above ₹500 qualify for free standard delivery. Orders below ₹500 attract a flat delivery fee of ₹49.',
      },
      {
        q: 'Do you deliver across all of India?',
        a: 'We deliver to most pin codes across India. A few remote areas may have longer delivery timelines or may not be serviceable. Enter your pin code at checkout to confirm availability.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order is dispatched, you\'ll receive a tracking link via email and SMS. You can also check your order status on the Order Confirmation page.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 7 days of delivery for damaged, defective, or incorrect products. Food items that have been opened cannot be returned for hygiene reasons.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Email us at fedorg@fedorg.in with your order number, photos of the product, and reason for return. Our team will arrange a pickup within 2 business days.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5–7 business days after we receive and inspect the returned item. The amount is credited to your original payment method.',
      },
      {
        q: 'What if I receive a damaged product?',
        a: 'Please take a photo immediately and email us at fedorg@fedorg.in within 48 hours of delivery. We\'ll arrange a replacement or full refund with no questions asked.',
      },
    ],
  },
  {
    category: 'Account & Support',
    items: [
      {
        q: 'Do I need an account to place an order?',
        a: 'You can browse and add products to your cart without an account, but you\'ll need to sign up to complete checkout. This helps us keep your order history and delivery addresses safe.',
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Login" and then "Forgot Password". Enter your registered email and we\'ll send a password reset link within a few minutes.',
      },
      {
        q: 'How can I contact customer support?',
        a: 'You can reach us via email at fedorg@fedorg.in, call us at 7510209632, or use the Contact Us form on our website. We respond within 24 hours on working days (Mon–Sat, 9 AM – 6 PM).',
      },
      {
        q: 'Do you offer bulk or wholesale pricing?',
        a: 'Yes! We offer special pricing for bulk orders (10 kg or more). Reach out via our Contact page and select "Bulk / wholesale enquiry" as the subject.',
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-semibold text-gray-800 text-sm leading-snug">{q}</span>
        <ChevronDown className={`w-5 h-5 text-primary-600 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-white">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState('');

  const filtered = faqs.map(section => ({
    ...section,
    items: section.items.filter(
      item =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.items.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Frequently Asked <span className="text-primary-700">Questions</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Everything you need to know about FEDORG Naturals.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-12 py-3 text-base w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500">No questions found for &quot;{search}&quot;</p>
            <button onClick={() => setSearch('')} className="mt-4 btn-secondary text-sm">Clear search</button>
          </div>
        ) : (
          filtered.map(section => (
            <div key={section.category} className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-600 rounded-full inline-block" />
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))
        )}

        {/* Still have questions */}
        <div className="mt-10 bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-5">Can't find what you're looking for? Our team is happy to help.</p>
          <Link href="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
