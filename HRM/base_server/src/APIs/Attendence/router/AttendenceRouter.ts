/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable quotes */
// src/routes/attendance.router.ts

import { Router } from "express";
import {
  createAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
} from "../contoller/AttendenceController";

const Attendencerouter = Router();

// Create attendance
Attendencerouter.post("/", createAttendance);

// Get attendance (by employeeId and date)
Attendencerouter.get("/", getAttendance);

// Update attendance
Attendencerouter.put("/:id", updateAttendance);

// Delete attendance
Attendencerouter.delete("/:id", deleteAttendance);

export default Attendencerouter;
