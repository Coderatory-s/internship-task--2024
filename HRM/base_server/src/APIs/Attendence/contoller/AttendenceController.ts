/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable quotes */

import { Request, Response } from 'express';
import Attendance, { IAttendance } from '../model/Attendence'; // Ensure the model name and path are correct

// Type definitions for query parameters
interface AttendanceQuery {
  employeeId?: string;
  date?: string;
}

// Create new attendance record
export const createAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendanceData: IAttendance = req.body; // Ensure `IAttendance` is the schema's interface
    const attendance = new Attendance(attendanceData);
    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error: unknown) {
    res.status(500).json({
      error: "Failed to create attendance record",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get attendance by employeeId and date
export const getAttendance = async (req: Request, res: Response): Promise<void> => {
  const { employeeId, date } = req.query as AttendanceQuery;

  if (!employeeId || !date) {
    res.status(400).json({ error: "employeeId and date are required query parameters." });
    return; // Ensure a response is always returned
  }

  try {
    const parsedDate = new Date(date); // Convert date to Date object
    const attendance = await Attendance.findOne({ employeeId, date: parsedDate });
    if (!attendance) {
      res.status(404).json({ error: 'Attendance record not found' });
      return; // Ensure a response is always returned
    }
    res.status(200).json(attendance);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch attendance record",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update attendance
export const updateAttendance = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAttendance) {
      res.status(404).json({ error: "Attendance record not found" });
      return; // Ensure a response is always returned
    }
    res.status(200).json(updatedAttendance);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to update attendance record",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete attendance record
export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      res.status(404).json({ error: "Attendance record not found" });
      return; // Ensure a response is always returned
    }
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to delete attendance record",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
