import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  category: { type: String, required: true, enum: ['grains', 'spices', 'peanut-butter'] },
  image: { type: String, default: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  inStock: { type: Boolean, default: true },
  weight: { type: String },
  badge: { type: String },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
