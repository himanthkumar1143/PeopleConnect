import HealthInfo from '../models/HealthInfo.js';

export const getHealthInfo = async (req, res) => {
  try {
    const info = await HealthInfo.find().sort({ createdAt: -1 });
    res.json({ info });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHealthInfo = async (req, res) => {
  try {
    const item = await HealthInfo.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHealthInfo = async (req, res) => {
  try {
    const item = await HealthInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Health info not found' });
    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHealthInfoById = async (req, res) => {
  try {
    const item = await HealthInfo.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Health info not found' });
    res.json({ info: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHealthInfo = async (req, res) => {
  try {
    const item = await HealthInfo.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Health info not found' });
    res.json({ message: 'Health info deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
