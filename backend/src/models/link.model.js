
import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    customAlias: { type: String },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clickCount: { type: Number, default: 0 },
  });
  
const Link = mongoose.model('Link', linkSchema);
export default Link;