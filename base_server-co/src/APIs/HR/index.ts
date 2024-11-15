import { Router } from 'express';
import authController from './auth.controller'; // Import your controller
import { validateLogin, validateRegister } from './authentication/validation/validation.middleware';


// Import your validation middleware
import asyncHandler from './handlers/async';// Adjust the path to where asyncHandler is located

const router = Router();

// User registration route
router.post(
    '/register',
    validateRegister, // Middleware to validate registration data
    asyncHandler(authController.register) // Using asyncHandler for error handling
);

// User login route
router.post(
    '/login',
    validateLogin, // Middleware to validate login data
    asyncHandler(authController.login) // Using asyncHandler for error handling
);

// User logout route
router.post('/logout', asyncHandler(authController.logout)); // Logout

// Confirm registration route (e.g., email confirmation)
router.get('/confirm/:token', asyncHandler(authController.confirmRegistration)); // Confirm registration

export default router;
