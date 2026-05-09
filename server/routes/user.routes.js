import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getAllUsers);

export default router;
