// src/APIs/form/routes/formResponseRoutes.ts

import { Router } from 'express';
import { getFormResponses, submitFormResponse } from '../../form/controlle/formResponseController';

const router = Router();

// Define the routes
router.get('/:id/responses', getFormResponses);
router.post('/:id/responses', submitFormResponse);

export default router;
