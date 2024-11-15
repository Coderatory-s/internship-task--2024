// userRoutes.ts

import { Router } from 'express';
import {
    changePassword,
    updateProfile,
    getProfile,
    deleteAccount
} from '../controlle/userController';

const router = Router();

// Define user routes
router.patch('/change-password', changePassword);
router.patch('/profile', updateProfile);
router.get('/profile', getProfile);
router.delete('/delete-account', deleteAccount);

export default router;
