import EducationResource from '../models/EducationResource.js';

export const getResources = async (req, res) => {
  try {
    const resources = await EducationResource.find().sort({ createdAt: -1 });
    res.json({ resources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await EducationResource.create(req.body);
    res.status(201).json({ resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await EducationResource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await EducationResource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await EducationResource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
