// src/routes/driverRoutes.ts

import { Router } from "express";
import {
  addDriver,
  getMatchingPassengers,
} from "../controllers/driverController";

const router = Router();

router.post("/", addDriver); // Add a new driver
router.post("/matching", getMatchingPassengers); // Get matching passengers

export default router;
