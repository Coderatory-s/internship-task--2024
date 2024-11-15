import { Router } from 'express';
import hrController from './controller';
//import authMiddleware from '../authentication/middleware/authMiddleware';

const router = Router();

// POST route for checking in (protected by authMiddleware)
router.post('/attendance/checkin',  hrController.checkIn);

// POST route for checking out (protected by authMiddleware)
router.post('/attendance/checkout',  hrController.checkOut);


export default router;
