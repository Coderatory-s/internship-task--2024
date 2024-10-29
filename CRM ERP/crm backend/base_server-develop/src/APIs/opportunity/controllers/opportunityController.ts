// import { Request, Response, NextFunction } from 'express'
// import opportunityService from '../services/opportunityService'
// import { opportunitySchema } from '../validations/opportunityValidation'

// export const createOpportunity = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//     try {
//         const { error } = opportunitySchema.validate(req.body)
//         if (error) {
//             return res.status(400).json({ error: error.details[0].message })
//         }

//         const opportunity = await opportunityService.createOpportunity(req.body)
//         return res.status(201).json({ message: 'Opportunity created successfully', data: opportunity })
//     } catch (error) {
//         return next(error) // Pass the error to the next middleware
//     }
// }

import { Request, Response, NextFunction } from 'express'
import opportunityService from '../services/opportunityService'
import { opportunitySchema } from '../validations/opportunityValidation'

export const createOpportunity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log('Received data:', req.body) // Log incoming data

        const { error } = opportunitySchema.validate(req.body)
        if (error) {
            res.status(400).json({ error: `Validation Error: ${error.details[0].message}` })
            return
        }

        const newOpportunity = await opportunityService.createOpportunity(req.body)
        res.status(201).json({ message: 'Opportunity created successfully', data: newOpportunity })
    } catch (error) {
        console.error('Error creating opportunity:', error)
        next(error) // Ensure proper error handling
    }
}

export const getOpportunities = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const opportunities = await opportunityService.getAllOpportunities()
        res.status(200).json({ message: 'Opportunities fetched successfully', data: opportunities })
    } catch (error) {
        console.error('Error fetching opportunities:', error)
        next(error)
    }
}
