import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1, min: 1 },
}, { timestamps: true });

CartItemSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
