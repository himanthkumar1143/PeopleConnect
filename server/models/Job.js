import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, default: 'Full-time' },
    salary: { type: String, default: '' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
