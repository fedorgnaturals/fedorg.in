import mongoose from 'mongoose';

const WishlistItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true });

WishlistItemSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.models.WishlistItem || mongoose.model('WishlistItem', WishlistItemSchema);
