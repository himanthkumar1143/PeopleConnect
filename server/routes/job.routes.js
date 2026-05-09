import express from 'express';
import { getJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/job.controller.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, getJobs);
router.get('/:id', protect, getJobById);
router.post('/', protect, adminOnly, createJob);
router.put('/:id', protect, adminOnly, updateJob);
router.delete('/:id', protect, adminOnly, deleteJob);

export default router;
