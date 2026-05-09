import Grievance from '../models/Grievance.js';

export const submitGrievance = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) return res.status(400).json({ message: 'Description is required' });
    const grievance = await Grievance.create({ description, filedBy: req.user._id });
    await grievance.populate('filedBy', 'name email');
    res.status(201).json({ grievance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ filedBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ grievances });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find()
      .populate('filedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({ grievances });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGrievanceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'in-progress', 'resolved'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: 'Invalid status value' });
    const grievance = await Grievance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('filedBy', 'name email');
    if (!grievance) return res.status(404).json({ message: 'Grievance not found' });
    res.json({ grievance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
