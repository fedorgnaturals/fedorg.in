import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, ArrowRight, Heart, Users } from 'lucide-react';
import { teamMembers } from '@/data/mockData';

const values = [
  { emoji: '🌿', title: 'Purity First', desc: 'We never compromise on ingredient quality. If it\'s not good enough for our own families, it\'s not good enough for yours.' },
  { emoji: '🤝', title: 'Farmer Partnerships', desc: 'We build long-term relationships with farmers, pay fair prices, and invest in their communities.' },
  { emoji: '🔬', title: 'Science-backed', desc: 'Every product is lab-tested for purity, nutrition, and safety before it reaches your door.' },
  { emoji: '💚', title: 'Planet Friendly', desc: 'Sustainable packaging, eco-friendly practices, and a commitment to leaving the planet better than we found it.' },
];

export default function TeamsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" /> The FEDORG Team
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            People who care about <span className="text-primary-700">what you eat</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a small but passionate team of food lovers, farmers&apos; advocates, and nutrition nerds on a mission to make clean, honest food accessible to every Indian household.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="card p-6 text-center group">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary-100 group-hover:ring-primary-300 transition-all">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm mt-0.5">{member.role}</p>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{member.bio}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs text-gray-400 hover:text-blue-600 transition-colors font-medium">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">What we stand for</h2>
            <p className="section-sub">Our values guide every decision we make</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-shadow text-center">
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Heart className="w-10 h-10 mx-auto mb-4 text-primary-300" />
          <h2 className="text-3xl font-bold mb-3">Want to join us?</h2>
          <p className="text-primary-100 mb-6">We&apos;re always looking for passionate people who share our love for good food and honest work.</p>
          <Link href="/products" className="btn-accent">
            Shop Our Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
