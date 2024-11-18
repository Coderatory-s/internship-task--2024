/* eslint-disable @typescript-eslint/no-misused-promises */
// user/index.ts
import express from 'express'
import { register, login, getProfile, logout, resetPassword, updatePassword, searchUserController } from './controllers/userController'
import { authenticateToken } from './middlewares/authMiddleware' // Import the middleware

export const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/logout', logout)

// Protect routes with authentication middleware
router.get('/:userId', authenticateToken, getProfile)
//router.put('/profile',authenticateToken, updateProfile)
router.post('/reset-password', resetPassword)
router.post('/update-password', updatePassword)
router.get('/search', searchUserController)

export default router
