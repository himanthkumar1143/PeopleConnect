import mongoose from 'mongoose';

const educationResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    courseName: { type: String, required: true, trim: true },
    resourceLink: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const EducationResource = mongoose.model('EducationResource', educationResourceSchema);
export default EducationResource;
