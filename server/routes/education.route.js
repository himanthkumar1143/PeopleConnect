import express from 'express';
import { getResources, getResourceById, createResource, updateResource, deleteResource } from '../controllers/education.controller.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, getResources);
router.get('/:id', protect, getResourceById);
router.post('/', protect, adminOnly, createResource);
router.put('/:id', protect, adminOnly, updateResource);
router.delete('/:id', protect, adminOnly, deleteResource);

export default router;
