/* eslint-disable @typescript-eslint/no-misused-promises */

// src/routes/CandidateRouter.ts
import { Router } from 'express';
import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from '../controller/CandidateController';

const Candidaterouter = Router();

// Create a candidate
Candidaterouter.post('/', createCandidate);

// Get all candidates
Candidaterouter.get('/', getAllCandidates);

// Get candidate by ID
Candidaterouter.get('/:id', getCandidateById);

// Update candidate
Candidaterouter.put('/:id', updateCandidate);

// Delete candidate
Candidaterouter.delete('/:id', deleteCandidate);

export default Candidaterouter;
