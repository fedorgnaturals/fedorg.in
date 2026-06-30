'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Heart, ArrowRight, Search } from 'lucide-react';
import { blogs, blogCategories } from '@/data/blogData';

function BlogCard({ blog }) {
  return (
    <article className="card group flex flex-col">
      <Link href={`/blog/${blog.slug}`} className="block relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 badge bg-primary-100 text-primary-700 capitalize">
          {blog.category}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />{blog.readTime}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Heart className="w-3.5 h-3.5 text-red-400" />{blog.likes}
          </span>
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <h2 className="font-bold text-gray-900 text-base leading-snug hover:text-primary-700 transition-colors line-clamp-2 mb-2">
            {blog.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{blog.excerpt}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-100">
              <Image src={blog.authorImage} alt={blog.author} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">{blog.author}</p>
              <p className="text-xs text-gray-400">{blog.authorRole}</p>
            </div>
          </div>
          <Link href={`/blog/${blog.slug}`} className="text-primary-600 hover:text-primary-800 text-xs font-medium flex items-center gap-1">
            Read <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = blogs.filter(b => {
    const matchCat = activeCategory === 'all' || b.category === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = blogs.reduce((max, b) => b.likes > max.likes ? b : max, blogs[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="section-heading">FEDORG Journal</h1>
        <p className="section-sub">Recipes, nutrition science, and stories from our farms</p>
      </div>

      {/* Featured post */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-12 card overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto bg-gray-100">
            <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-4 left-4 badge bg-accent-500 text-white text-sm px-3 py-1">Featured</span>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="badge bg-primary-100 text-primary-700 capitalize mb-3">{featured.category}</span>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-snug mb-3">
              {featured.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-100">
                  <Image src={featured.authorImage} alt={featured.author} fill className="object-cover" />
                </div>
                <span className="font-medium text-gray-600">{featured.author}</span>
              </div>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              <span className="flex items-center gap-1 ml-auto"><Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />{featured.likes}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {blogCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-gray-500">No articles found.</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="mt-4 btn-secondary text-sm">Clear filters</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(blog => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  );
}
