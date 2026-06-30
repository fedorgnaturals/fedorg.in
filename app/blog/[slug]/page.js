'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Calendar, Clock, ArrowLeft, Share2, Tag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { blogs } from '@/data/blogData';

// Simple markdown-like renderer for blog content
function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="border-gray-200 my-6" />);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        listItems.push(<li key={i} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: lines[i].trim().slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 my-3 ml-4">{listItems}</ul>);
      continue;
    } else if (/^\d+\. /.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        listItems.push(<li key={i} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: lines[i].trim().replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="list-decimal list-inside space-y-1.5 my-3 ml-4">{listItems}</ol>);
      continue;
    } else if (line.startsWith('| ')) {
      // Table
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        if (!lines[i].includes('---')) rows.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri === 0 ? 'bg-primary-50 font-semibold' : 'border-t border-gray-100'}>
                  {row.split('|').filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-gray-700">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else {
      const html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      elements.push(<p key={i} className="text-gray-600 leading-relaxed my-2" dangerouslySetInnerHTML={{ __html: html }} />);
    }
    i++;
  }
  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const blog = blogs.find(b => b.slug === slug);

  const [likes, setLikes] = useState(blog?.likes ?? 0);
  const [liked, setLiked] = useState(false);

  // Persist likes in localStorage
  useEffect(() => {
    if (!blog) return;
    const stored = JSON.parse(localStorage.getItem('fedorg_blog_likes') || '{}');
    if (stored[blog.id]) {
      setLiked(true);
      setLikes(blog.likes + 1);
    }
  }, [blog]);

  const handleLike = () => {
    if (!blog) return;
    const stored = JSON.parse(localStorage.getItem('fedorg_blog_likes') || '{}');
    if (liked) {
      delete stored[blog.id];
      setLiked(false);
      setLikes(l => l - 1);
      toast('Removed like', { icon: '🤍' });
    } else {
      stored[blog.id] = true;
      setLiked(true);
      setLikes(l => l + 1);
      toast.success('Liked!', { icon: '❤️' });
    }
    localStorage.setItem('fedorg_blog_likes', JSON.stringify(stored));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: blog?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Article not found.</p>
        <Link href="/blog" className="btn-primary">← Back to Blog</Link>
      </div>
    );
  }

  const related = blogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-10">

        {/* Main article */}
        <article className="lg:col-span-2">
          {/* Back */}
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>

          {/* Category + meta */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="badge bg-primary-100 text-primary-700 capitalize">{blog.category}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />{blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              <Image src={blog.authorImage} alt={blog.author} fill className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{blog.author}</p>
              <p className="text-sm text-gray-400">{blog.authorRole}, FEDORG</p>
            </div>
          </div>

          {/* Cover image */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-100 mb-8">
            <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="prose-content">
            {renderContent(blog.content)}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-10 pt-6 border-t border-gray-100">
            <Tag className="w-4 h-4 text-gray-400" />
            {blog.tags.map(tag => (
              <span key={tag} className="badge bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like + Share */}
          <div className="flex items-center gap-4 mt-8 p-6 bg-gray-50 rounded-2xl">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Found this helpful?</p>
              <p className="text-sm text-gray-500">Give it a like and share it with someone who&apos;d enjoy it.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  liked
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
                <span className="font-bold">{likes.toLocaleString()}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 font-medium text-sm transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Author card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 mx-auto mb-3">
              <Image src={blog.authorImage} alt={blog.author} fill className="object-cover" />
            </div>
            <p className="font-bold text-gray-900">{blog.author}</p>
            <p className="text-sm text-primary-600">{blog.authorRole}</p>
            <p className="text-xs text-gray-400 mt-2">FEDORG Team</p>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map(r => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="flex gap-3 group">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <Image src={r.coverImage} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">{r.title}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" />{r.likes}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All posts CTA */}
          <Link href="/blog" className="btn-secondary w-full justify-center text-sm">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
