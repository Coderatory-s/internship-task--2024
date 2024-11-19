/* eslint-disable @typescript-eslint/no-misused-promises */
// src/routes/TaskRouter.ts
import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../contoller/taskController';

const Taskrouter = Router();

// Create a task
Taskrouter.post('/', createTask);

// Get all tasks
Taskrouter.get('/', getAllTasks);

// Get task by ID
Taskrouter.get('/:id', getTaskById);

// Update task
Taskrouter.put('/:id', updateTask);

// Delete task
Taskrouter.delete('/:id', deleteTask);

export default Taskrouter;
