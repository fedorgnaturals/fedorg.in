import Link from 'next/link';
import { Truck, Clock, MapPin, Package, AlertCircle, CheckCircle } from 'lucide-react';

const shippingZones = [
  { zone: 'Metro Cities', cities: 'Chennai, Mumbai, Delhi, Bengaluru, Hyderabad, Kolkata', time: '2–3 business days', charge: 'Free above ₹500 | ₹49 below' },
  { zone: 'Tier-1 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, Surat, Kochi', time: '3–4 business days', charge: 'Free above ₹500 | ₹49 below' },
  { zone: 'Tier-2 & Tier-3 Cities', cities: 'All other serviceable pin codes', time: '4–5 business days', charge: 'Free above ₹500 | ₹49 below' },
  { zone: 'Remote Areas', cities: 'Certain pin codes in J&K, Northeast India, Andaman & Nicobar', time: '7–10 business days', charge: '₹99 flat' },
];

export default function ShippingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Truck className="w-8 h-8 text-primary-700" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Shipping <span className="text-primary-700">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg">Fast, reliable delivery across India. Here's everything you need to know.</p>
          <p className="text-xs text-gray-400 mt-4">Last updated: 1 July 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'On all orders above ₹500' },
            { icon: Clock, title: '2–5 Business Days', desc: 'Standard delivery timeline' },
            { icon: MapPin, title: 'Pan India', desc: 'Delivered to 25,000+ pin codes' },
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

        {/* Delivery Charges */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Charges</h2>
          <p className="text-gray-500 mb-6">We keep shipping affordable so you can enjoy healthy food without worrying about extra costs.</p>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 bg-primary-700 text-white text-sm font-semibold px-6 py-3">
              <span>Order Value</span>
              <span>Delivery Fee</span>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="grid grid-cols-2 px-6 py-4 text-sm">
                <span className="text-gray-700">Below ₹500</span>
                <span className="font-semibold text-gray-900">₹49 flat</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 text-sm bg-primary-50">
                <span className="text-gray-700">₹500 and above</span>
                <span className="font-semibold text-primary-700 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> FREE</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 text-sm">
                <span className="text-gray-700">Remote / special areas</span>
                <span className="font-semibold text-gray-900">₹99 flat</span>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Zones */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Timelines by Zone</h2>
          <p className="text-gray-500 mb-6">All timelines are in business days (Monday to Saturday, excluding public holidays).</p>
          <div className="space-y-4">
            {shippingZones.map(zone => (
              <div key={zone.zone} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-wrap gap-4 justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{zone.zone}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{zone.cities}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="badge bg-primary-100 text-primary-700 flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{zone.time}</span>
                    <p className="text-xs text-gray-500 mt-1.5">{zone.charge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Order Processing */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Processing</h2>
          <div className="space-y-4">
            {[
              { icon: Package, title: 'Order Confirmation', desc: 'You will receive an email and SMS confirmation immediately after placing your order.' },
              { icon: CheckCircle, title: 'Processing Time', desc: 'Orders are processed within 24 hours on business days. Orders placed after 3 PM or on Sundays/public holidays are processed the next business day.' },
              { icon: Truck, title: 'Dispatch', desc: 'Once dispatched, you will receive a tracking link via email and SMS. Delivery partners include Shiprocket, Delhivery, and BlueDart.' },
              { icon: MapPin, title: 'Delivery Attempt', desc: 'Our delivery partner will attempt delivery up to 3 times. After 3 failed attempts, the order is returned and a refund is initiated.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
            {[
              'Delivery timelines are estimates and may be affected by weather, holidays, or high demand periods.',
              'FEDORG is not liable for delays caused by incorrect or incomplete delivery addresses provided by the customer.',
              'Bulk orders (above 20 kg) may require additional processing time of 1–2 business days.',
              'We currently do not offer same-day or express delivery.',
              'During festival seasons (Diwali, Pongal, etc.), delivery may take an additional 1–2 business days.',
            ].map((note, i) => (
              <div key={i} className="flex gap-3 text-sm text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Questions about your delivery?</h3>
          <p className="text-gray-500 text-sm mb-5">Reach out and we'll track it down for you.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">Contact Support</Link>
            <Link href="/faq" className="btn-secondary">View FAQ</Link>
          </div>
        </div>

      </div>
    </>
  );
}
