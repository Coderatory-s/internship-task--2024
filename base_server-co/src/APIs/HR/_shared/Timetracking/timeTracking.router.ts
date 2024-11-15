// routes/timeTracking.router.ts
import { Router } from 'express';
import { trackTime, getTimeEntries } from '../Timetracking/timeTracking.controller'; // Make sure these functions are implemented

const router = Router();

// Track Time Entry
router.post('/track', trackTime);

// Get Time Entries
router.get('/', getTimeEntries);

export default router;
