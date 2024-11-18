// user/index.ts
import express from 'express'
import {
    register,
    login,
    getProfile,
    logout,
    updateProfile,
    deleteUser,
    getUserById,
    resetPassword,
    updatePassword
} from './controllers/userController'
import { authenticateToken } from './middlewares/authMiddleware' // Import the middleware
import { searchUser } from './controllers/userController'
import { upload } from './middlewares/uploadMiddleware'

const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/logout', logout)
router.get('/:id', authenticateToken, getUserById) // Add this route for fetching a user by ID

router.get('/', authenticateToken, getProfile)
router.put('/profile', authenticateToken, upload, updateProfile)
router.delete('/profile', authenticateToken, deleteUser)
router.post('/reset-password', resetPassword)
router.post('/update-password', updatePassword)
router.get('/search/username', searchUser) // Search API

export default router
