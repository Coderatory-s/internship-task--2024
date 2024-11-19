/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// src/controllers/TaskController.ts
import { Request, Response } from 'express';
import Task, { ITask } from '../model/taskModel';

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskData: ITask = req.body;
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to create task',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all tasks
export const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to fetch tasks',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to fetch task',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to update task',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to delete task',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
