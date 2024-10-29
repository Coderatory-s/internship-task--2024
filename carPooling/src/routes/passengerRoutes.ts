// src/routes/passengerRoutes.ts

import { Router } from "express";
import {
  addPassenger,
  findMatchingDrivers,
} from "../controllers/passengerController";

const router = Router();

router.post("/", addPassenger); // Add a new passenger
router.post("/matching", findMatchingDrivers); // Get matching drivers

export default router;
