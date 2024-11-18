/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express';
import ProgressTracker, { IProgressTracker } from '../model/tracker';

// Create a new progress tracker
export const createProgressTracker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskName, progress, status, comments } = req.body;

    const newProgressTracker: IProgressTracker = new ProgressTracker({
      taskName,
      progress,
      status,
      comments,
    });

    const savedProgressTracker = await newProgressTracker.save();
    res.status(201).json(savedProgressTracker);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create progress tracker.' });
  }
};

// Get all progress trackers
export const getProgressTrackers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const trackers = await ProgressTracker.find();
    res.status(200).json(trackers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress trackers.' });
  }
};

// Update a progress tracker
export const updateProgressTracker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTracker = await ProgressTracker.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTracker) {
      res.status(404).json({ error: 'Progress tracker not found.' });
      return;
    }

    res.status(200).json(updatedTracker);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress tracker.' });
  }
};

// Delete a progress tracker
export const deleteProgressTracker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTracker = await ProgressTracker.findByIdAndDelete(id);

    if (!deletedTracker) {
      res.status(404).json({ error: 'Progress tracker not found.' });
      return;
    }

    res.status(200).json({ message: 'Progress tracker deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete progress tracker.' });
  }
};
