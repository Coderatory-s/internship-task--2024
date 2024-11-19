/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// src/controllers/CandidateController.ts
import { Request, Response } from 'express';
import Candidate, { ICandidate } from '../model/CandidateModel';

// Create a new candidate
export const createCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const candidateData: ICandidate = req.body;
    const newCandidate = new Candidate(candidateData);
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to create candidate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all candidates
export const getAllCandidates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to fetch candidates',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get candidate by ID
export const getCandidateById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      res.status(404).json({ error: 'Candidate not found' });
      return;
    }
    res.status(200).json(candidate);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to fetch candidate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update candidate
export const updateCandidate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCandidate) {
      res.status(404).json({ error: 'Candidate not found' });
      return;
    }
    res.status(200).json(updatedCandidate);
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to update candidate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete candidate
export const deleteCandidate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(id);
    if (!deletedCandidate) {
      res.status(404).json({ error: 'Candidate not found' });
      return;
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'Failed to delete candidate',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
