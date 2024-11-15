import { Router } from 'express';
import authController from '../authentication/authController';
import authMiddleware from '../authentication/middleware/authMiddleware';

const router = Router();

// Register route
router.post('/register', authController.register, authMiddleware);

// Login route
router.post('/login', authController.login, authMiddleware);

export default router;
