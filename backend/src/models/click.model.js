
import mongoose from 'mongoose'

const clickSchema = new mongoose.Schema({
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    ipAddress: String,
    userAgent: String,
    device: String,
    browser: String,
    os: String,
    timestamp: { type: Date, default: Date.now },
  });
  
const Click = mongoose.model('Click', clickSchema);
export default Click;