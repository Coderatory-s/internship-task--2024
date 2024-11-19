/* eslint-disable @typescript-eslint/no-misused-promises */
// src/routes/JobRouter.ts
import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../contoller/JobController';

const Jobrouter = Router();

// Create a job
Jobrouter.post('/', createJob);

// Get all jobs
Jobrouter.get('/', getAllJobs);

// Get job by ID
Jobrouter.get('/:id', getJobById);

// Update a job
Jobrouter.put('/:id', updateJob);

// Delete a job
Jobrouter.delete('/:id', deleteJob);

export default Jobrouter;
