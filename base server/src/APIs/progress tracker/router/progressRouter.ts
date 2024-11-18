/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createProgressTracker,
  getProgressTrackers,
  updateProgressTracker,
  deleteProgressTracker,
} from '../controller/progressController';

const router = express.Router();

// Route to create a new progress tracker
router.post('/', createProgressTracker);

// Route to fetch all progress trackers
router.get('/', getProgressTrackers);

// Route to update a progress tracker by ID
router.put('/:id', updateProgressTracker);

// Route to delete a progress tracker by ID
router.delete('/:id', deleteProgressTracker);

export default router;
