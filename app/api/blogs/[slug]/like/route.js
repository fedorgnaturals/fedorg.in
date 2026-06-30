import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { action } = await req.json(); // 'like' or 'unlike'
    const inc = action === 'unlike' ? -1 : 1;
    const blog = await Blog.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { likes: inc } },
      { new: true }
    );
    if (!blog) return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ success: true, likes: blog.likes });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
