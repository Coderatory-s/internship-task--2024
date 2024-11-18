/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { markAttendance, getAttendanceByDate, getAttendanceByEmployee, updateAttendance, deleteAttendance } from '../controller/Attendancecontroller'

const AttendanceRouter = Router()

AttendanceRouter.post('/attendance', markAttendance)
AttendanceRouter.get('/attendance/date/:date', getAttendanceByDate)
AttendanceRouter.get('/attendance/employee/:employeeId', getAttendanceByEmployee)
AttendanceRouter.put('/attendance/:id', updateAttendance)
AttendanceRouter.delete('/attendance/:id', deleteAttendance)

export default AttendanceRouter
