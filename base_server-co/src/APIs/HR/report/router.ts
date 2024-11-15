// src/APIs/HR/report/routes.ts

import { Router } from 'express';
import reportController from './controller';  // Import the report controller

const router = Router();

router.post('/report/create', reportController.createReport);  // Route for creating a report

export default router;
