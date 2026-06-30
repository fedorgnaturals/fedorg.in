import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Leaf, Sprout, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockData';

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    desc: 'No artificial colors, flavors, or preservatives. Ever.',
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: ShieldCheck,
    title: 'Lab Tested',
    desc: 'Every batch tested for purity, pesticides, and heavy metals.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Truck,
    title: 'Farm to Home',
    desc: 'Direct sourcing from farmers — fresher food, fair prices.',
    color: 'text-accent-600 bg-accent-50',
  },
  {
    icon: Sprout,
    title: 'Sustainably Grown',
    desc: 'We support eco-friendly farming practices across India.',
    color: 'text-green-600 bg-green-50',
  },
];

const testimonials = [
  {
    name: 'Ananya R.',
    location: 'Bangalore',
    text: 'The peanut butter is unreal — no sugar, no oil, just pure peanuts. Been ordering every month!',
    rating: 5,
  },
  {
    name: 'Mohammed I.',
    location: 'Chennai',
    text: 'The turmeric has such a strong color and aroma. You can taste the difference from store-bought instantly.',
    rating: 5,
  },
  {
    name: 'Sunita P.',
    location: 'Hyderabad',
    text: 'Brown rice is our everyday staple now. Love that I know exactly where it comes from.',
    rating: 4,
  },
];

const featuredProducts = products.filter((p) => p.badge && p.badge !== 'Out of Stock').slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-primary-700 bg-primary-100 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-3.5 h-3.5" /> Pure. Natural. Honest.
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Food that&apos;s good for{' '}
                <span className="text-primary-700">you & the planet</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
                Premium food grains, aromatic spices, and wholesome peanut butter — sourced directly
                from Indian farms. No middlemen, no shortcuts.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary text-base px-8 py-3">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/teams" className="btn-secondary text-base px-8 py-3">
                  Our Story
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {['🧑‍🌾', '👩', '🧑', '👨'].map((e, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-base"
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-gray-900">12,000+</strong> happy customers
                </span>
              </div>
            </div>

            <div className="relative hidden lg:grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
                'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
                'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
                'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80',
              ].map((src, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden ${
                    i === 0 ? 'row-span-2 h-72' : 'h-32'
                  }`}
                >
                  <Image src={src} alt="product" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-heading">Our Bestsellers</h2>
              <p className="section-sub">Loved by thousands of Indian households</p>
            </div>
            <Link href="/products" className="btn-secondary text-sm hidden sm:flex">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link href="/products" className="btn-secondary w-full justify-center">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION — Banner */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                From the farm. To your table. <br />
                <span className="text-primary-300">No compromise.</span>
              </h2>
              <p className="mt-4 text-primary-100 text-lg leading-relaxed">
                FEDORG partners directly with 200+ farmers across Punjab, Karnataka, Kerala, and
                Tamil Nadu. We cut out middlemen so farmers earn more and you pay less for better
                food.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                {[
                  { val: '200+', label: 'Farmers' },
                  { val: '12K+', label: 'Customers' },
                  { val: '9', label: 'Products' },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="text-3xl font-extrabold">{val}</div>
                    <div className="text-primary-200 text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <Link href="/products" className="mt-8 btn-accent inline-flex">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
                alt="Farmer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">What our customers say</h2>
            <p className="section-sub">Real reviews from real families</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, text, rating }) => (
              <div key={name} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-14 bg-accent-50 border-y border-accent-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to eat better?</h2>
          <p className="mt-3 text-gray-600">
            Join 12,000+ families who&apos;ve made the switch to cleaner, honest food.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="btn-primary px-10 py-3 text-base">
              Get Started Free
            </Link>
            <Link href="/products" className="btn-secondary px-10 py-3 text-base">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
