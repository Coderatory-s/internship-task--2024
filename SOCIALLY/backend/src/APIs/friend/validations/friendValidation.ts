import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

// Validation schema for sending a friend request
const sendRequestSchema = Joi.object({
    senderId: Joi.string().required().messages({
        'string.empty': 'Sender ID is required',
        'any.required': 'Sender ID is required'
    }),
    receiverId: Joi.string().required().messages({
        'string.empty': 'Receiver ID is required',
        'any.required': 'Receiver ID is required'
    })
})

// Validation schema for request actions (accept/reject)
const requestActionSchema = Joi.object({
    requestId: Joi.string().required().messages({
        'string.empty': 'Request ID is required',
        'any.required': 'Request ID is required'
    })
})
// Middleware to validate sending a friend request
export const validateSendRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = sendRequestSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    return next() // Explicitly return after calling next()
}

// Middleware to validate accepting/rejecting a friend request
export const validateRequestAction = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = requestActionSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
    }
    return next() // Explicitly return after calling next()
}
