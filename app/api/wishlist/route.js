import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import WishlistItem from '@/models/WishlistItem';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ success: false, error: 'userId required' }, { status: 400 });
    const items = await WishlistItem.find({ user: userId }).populate('product');
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, productId } = await req.json();
    const existing = await WishlistItem.findOne({ user: userId, product: productId });
    if (existing) {
      await existing.deleteOne();
      return NextResponse.json({ success: true, action: 'removed' });
    }
    const item = await WishlistItem.create({ user: userId, product: productId });
    return NextResponse.json({ success: true, action: 'added', data: item });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const productId = searchParams.get('productId');
    await WishlistItem.findOneAndDelete({ user: userId, product: productId });
    return NextResponse.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
