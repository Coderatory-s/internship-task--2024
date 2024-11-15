// routes/managementRequest.router.ts
import { Router } from 'express';
import { requestManagement, getManagementRequests, updateManagementRequest } from '../validation/managementRequest.controller';

const router = Router();

router.post('/', requestManagement); // Submit a management request
router.get('/', getManagementRequests); // Get all management requests
router.put('/update/:id', updateManagementRequest); // Update a management request

export default router;
