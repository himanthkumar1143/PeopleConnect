import Resource from '../models/Resource.js';

export const getResources = async (req, res) => {
  try {
    const tips = await Resource.find().sort({ createdAt: -1 });
    res.json({ tips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const tip = await Resource.create(req.body);
    res.status(201).json({ tip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const tip = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ tip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const tip = await Resource.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ tip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const tip = await Resource.findByIdAndDelete(req.params.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ message: 'Tip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
