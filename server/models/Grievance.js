import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    filedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Grievance = mongoose.model('Grievance', grievanceSchema);
export default Grievance;
