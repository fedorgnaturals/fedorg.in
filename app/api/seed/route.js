import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import Blog from '@/models/Blog';
import { products } from '@/data/mockData';
import { blogs } from '@/data/blogData';

// GET /api/seed  — run once to populate DB from mock data
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed not allowed in production' }, { status: 403 });
  }
  try {
    await connectDB();

    // Seed Products
    await Product.deleteMany({});
    const seededProducts = await Product.insertMany(
      products.map(p => ({
        name: p.name,
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice,
        category: p.category,
        image: p.image,
        inStock: p.inStock !== false,
        weight: p.weight,
        badge: p.badge,
        rating: p.rating,
        reviews: p.reviews,
        tags: p.tags || [],
      }))
    );

    // Seed Blogs
    await Blog.deleteMany({});
    const seededBlogs = await Blog.insertMany(
      blogs.map(b => ({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        author: b.author,
        authorRole: b.authorRole,
        authorImage: b.authorImage,
        coverImage: b.coverImage,
        readTime: b.readTime,
        likes: b.likes || 0,
        tags: b.tags || [],
        publishedAt: new Date(b.publishedAt),
      }))
    );

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      products: seededProducts.length,
      blogs: seededBlogs.length,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
