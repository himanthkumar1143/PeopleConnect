import mongoose from 'mongoose';

const healthInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    services: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const HealthInfo = mongoose.model('HealthInfo', healthInfoSchema);
export default HealthInfo;
