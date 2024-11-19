/* eslint-disable @typescript-eslint/no-misused-promises */

// src/routes/TaskRouter.ts
import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../contoller/ProgressController';

const Progressrouter = Router();

// Create a new task
Progressrouter.post('/', createTask);

// Get all tasks
Progressrouter.get('/', getAllTasks);

// Get task by ID
Progressrouter.get('/:id', getTaskById);

// Update a task
Progressrouter.put('/:id', updateTask);

// Delete a task
Progressrouter.delete('/:id', deleteTask);

export default Progressrouter;
