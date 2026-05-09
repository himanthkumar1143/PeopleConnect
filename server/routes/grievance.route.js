import express from 'express';
import {
  submitGrievance,
  getMyGrievances,
  getAllGrievances,
  updateGrievanceStatus,
} from '../controllers/grievance.controller.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/', protect, submitGrievance);
router.get('/my', protect, getMyGrievances);
router.get('/all', protect, adminOnly, getAllGrievances);
router.put('/:id/status', protect, adminOnly, updateGrievanceStatus);

export default router;
