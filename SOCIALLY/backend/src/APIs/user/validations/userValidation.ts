// validations/userValidation.ts

import Joi from 'joi'
import { body } from 'express-validator'

// Register validation schema
export const registerValidation = Joi.object({
    name: Joi.string().min(3).max(72).trim().required().messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name cannot exceed 72 characters',
        'any.required': 'Name is required'
    }),

    email: Joi.string()
        .email({ tlds: { allow: false } }) // Ensures email format with @ and domain structure
        .required()
        .messages({
            'string.email': 'Please enter a valid email address with @ and a valid domain',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(8)
        .max(24)
        .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,24}$/) // Ensures at least one uppercase, one lowercase, one number, one special character, and no spaces
        .trim()
        .required()
        .messages({
            'string.pattern.base':
                'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character, and no spaces',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 24 characters',
            'any.required': 'Password is required'
        })
})

// Login validation schema
export const loginValidation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address with @ and a valid domain',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(8)
        .max(24)
        .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,24}$/)
        .trim()
        .required()
        .messages({
            'string.pattern.base':
                'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character, and no spaces',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 24 characters',
            'any.required': 'Password is required'
        })
})

export const validateSearchUser = [body('name').notEmpty().withMessage('Search term is required')]

// Profile update validation schema
export const profileUpdateValidation = Joi.object({
    name: Joi.string().min(3).max(72).optional(),
    bio: Joi.string().optional(),
    avatar: Joi.string().optional()
})
