/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Attendance from '../model/Attendance'
import { Request, Response } from 'express'

// Mark attendance for an employee
export const markAttendance = async (req: Request, res: Response) => {
    try {
        const { employeeId, date, status, checkInTime, checkOutTime } = req.body

        const attendance = new Attendance({
            employeeId,
            date,
            status,
            checkInTime,
            checkOutTime
        })

        const savedAttendance = await attendance.save()
        res.status(201).json(savedAttendance)
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error })
    }
}

// Get attendance record for a specific date
export const getAttendanceByDate = async (req: Request, res: Response) => {
    try {
        const { date } = req.params
        const attendance = await Attendance.find({ date: new Date(date) })
        res.status(200).json(attendance)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance', error })
    }
}

// Get attendance record for a specific employee
export const getAttendanceByEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params
        const attendance = await Attendance.find({ employeeId })
        res.status(200).json(attendance)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance', error })
    }
}

// Update attendance record
export const updateAttendance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true })
        if (updatedAttendance) {
            res.status(200).json(updatedAttendance)
        } else {
            res.status(404).json({ message: 'Attendance record not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance', error })
    }
}

// Delete attendance record
export const deleteAttendance = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deletedAttendance = await Attendance.findByIdAndDelete(id)
        if (deletedAttendance) {
            res.status(200).json({ message: 'Attendance record deleted successfully' })
        } else {
            res.status(404).json({ message: 'Attendance record not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance', error })
    }
}
