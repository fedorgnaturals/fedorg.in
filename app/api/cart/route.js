import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CartItem from '@/models/CartItem';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ success: false, error: 'userId required' }, { status: 400 });
    const items = await CartItem.find({ user: userId }).populate('product');
    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, productId, qty = 1 } = await req.json();
    const item = await CartItem.findOneAndUpdate(
      { user: userId, product: productId },
      { qty },
      { upsert: true, new: true }
    ).populate('product');
    return NextResponse.json({ success: true, data: item });
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
    if (productId) {
      await CartItem.findOneAndDelete({ user: userId, product: productId });
    } else {
      await CartItem.deleteMany({ user: userId });
    }
    return NextResponse.json({ success: true, message: 'Removed' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
