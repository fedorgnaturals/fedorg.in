import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug });
    if (!blog) return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
