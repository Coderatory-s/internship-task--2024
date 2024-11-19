/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/controllers/JobController.ts
import { Request, Response } from 'express';
import Job, { IJob } from '../model/jobModel';

// Create a new job
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobData: IJob = req.body;
    const newJob = new Job(jobData);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to create job',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all jobs
export const getAllJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to fetch jobs',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.status(200).json(job);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to fetch job',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a job
export const updateJob = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJob) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.status(200).json(updatedJob);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to update job',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a job
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to delete job',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
