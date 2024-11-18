// user/index.ts
import express from 'express'
import { register, login, getProfile, logout, updateProfile, deleteUser, resetPassword, updatePassword } from './controllers/userController'
import { authenticateToken } from './middlewares/authMiddleware'

import { searchUserController } from './controllers/userController'

import { uploadCourse } from '../course_builder/_shared/controllers/createCourse'
import { getCoursesTeacher } from '../course_builder/_shared/controllers/getCoursesTeacher'
import deleteCourse from '../course_builder/_shared/controllers/deleteCourse'
import getSingleCourse from '../course_builder/_shared/controllers/getSingleCourse'

import { createLecture, uploadLecture } from '../course_builder/_shared/controllers/Lectures/createLectures'
import getAllLectures from '../course_builder/_shared/controllers/Lectures/getAllLectures'
// import { authenticateStudent } from '../course_builder/_shared/middleware/authenticateStudent'
import {createStudent} from '../course_builder/_shared/controllers/Students/createStudent'
import { getAllCoursesByAdmins } from '../course_builder/_shared/controllers/getAllCourses'
import { authenticateStudent } from '../course_builder/_shared/middleware/authenticateStudent'
import { getAllStudents } from '../course_builder/_shared/controllers/Students/getAllStudents'
import { authenticateUser } from '../course_builder/_shared/middleware/authenticateUser'
// import getSingleLecture from '../course_builder/_shared/controllers/Lectures/getSingleLecture'
// import deleteLecture from '../course_builder/_shared/controllers/Lectures/deleteLecture'

const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/logout', logout)

router.get('/:userId', authenticateToken, getProfile)
router.put('/profile', authenticateToken, updateProfile)
router.delete('/profile', authenticateToken, deleteUser)
router.post('/reset-password', resetPassword)
router.post('/update-password', updatePassword)
router.get('/search', searchUserController)

// COURSE CREATE , GET , DELETE
router.post('/:userId/courses', authenticateToken, uploadCourse)
router.get('/:userId/getCourses', authenticateToken, getCoursesTeacher)
router.get('/:userId/getCourses/:courseId', authenticateToken, getSingleCourse)
router.delete('/:userId/getCourses/:courseId', authenticateToken, deleteCourse)

// LECTURE CREATE , GET , DELETE

router.post('/:userId/getCourses/:courseId/lectures', authenticateToken, uploadLecture, createLecture)
router.get('/:userId/getCourses/:courseId/lectures', authenticateToken, getAllLectures)
// router.get('/:userId/getCourses/:courseId/lectures/:lectureId', authenticateToken, getSingleLecture)
// router.delete('/:userId/getCourses/:courseId/lectures/:lectureId', authenticateToken, deleteLecture)

router.get('/:userId/getCourse', authenticateToken, getAllCoursesByAdmins)
router.post('/:userId/getCourse/:courseId/enroll', authenticateStudent, createStudent)
router.get('/:userId/getCourse/:courseId/enrolledStudent', authenticateUser, getAllStudents)
export default router
