import express from 'express';
import { getHealthInfo, getHealthInfoById, createHealthInfo, updateHealthInfo, deleteHealthInfo } from '../controllers/healthcare.controller.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, getHealthInfo);
router.get('/:id', protect, getHealthInfoById);
router.post('/', protect, adminOnly, createHealthInfo);
router.put('/:id', protect, adminOnly, updateHealthInfo);
router.delete('/:id', protect, adminOnly, deleteHealthInfo);

export default router;
