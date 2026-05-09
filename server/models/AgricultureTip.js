import mongoose from 'mongoose';

const agricultureTipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['tip', 'scheme'], default: 'tip' },
  },
  { timestamps: true }
);

const AgricultureTip = mongoose.model('AgricultureTip', agricultureTipSchema);
export default AgricultureTip;
