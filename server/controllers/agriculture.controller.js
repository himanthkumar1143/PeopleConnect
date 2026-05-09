import AgricultureTip from '../models/AgricultureTip.js';

export const getTips = async (req, res) => {
  try {
    const tips = await AgricultureTip.find().sort({ createdAt: -1 });
    res.json({ tips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTip = async (req, res) => {
  try {
    const tip = await AgricultureTip.create(req.body);
    res.status(201).json({ tip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTip = async (req, res) => {
  try {
    const tip = await AgricultureTip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ tip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTipById = async (req, res) => {
  try {
    const tip = await AgricultureTip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ tip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTip = async (req, res) => {
  try {
    const tip = await AgricultureTip.findByIdAndDelete(req.params.id);
    if (!tip) return res.status(404).json({ message: 'Tip not found' });
    res.json({ message: 'Tip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
