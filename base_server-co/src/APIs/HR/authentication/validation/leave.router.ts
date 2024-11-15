// routes/leave.router.ts
import { Router } from 'express';
import { submitLeave, getAllLeaves, updateLeave } from '../validation/leave.controller'

const router = Router();

router.post('/', submitLeave); // Submit a leave request
router.get('/', getAllLeaves); // Get all leave requests
router.put('/update/:id', updateLeave); // Update a leave request

export default router;
