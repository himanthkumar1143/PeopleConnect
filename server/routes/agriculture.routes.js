import express from 'express';
import { getTips, getTipById, createTip, updateTip, deleteTip } from '../controllers/agriculture.controller.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, getTips);
router.get('/:id', protect, getTipById);
router.post('/', protect, adminOnly, createTip);
router.put('/:id', protect, adminOnly, updateTip);
router.delete('/:id', protect, adminOnly, deleteTip);

export default router;
