import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['nutrition', 'recipes', 'farming', 'lifestyle'], required: true },
  author: { type: String, required: true },
  authorRole: String,
  authorImage: String,
  coverImage: String,
  readTime: String,
  likes: { type: Number, default: 0 },
  tags: [String],
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
