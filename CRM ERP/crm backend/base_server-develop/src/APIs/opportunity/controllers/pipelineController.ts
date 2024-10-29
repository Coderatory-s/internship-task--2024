// controllers/pipelineController.ts
import { Request, Response, NextFunction } from 'express'
import opportunityService from '../services/opportunityService'

// Fetch all opportunities in the pipeline
export const getPipelineOpportunities = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const opportunities = await opportunityService.getPipelineOpportunities()
        res.status(200).json({ data: opportunities })
    } catch (error) {
        next(error)
    }
}

// Update the stage of an opportunity
export const updateOpportunityStage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { stage } = req.body

        const updatedOpportunity = await opportunityService.updateOpportunityStage(id, stage)
        res.status(200).json({ message: 'Opportunity stage updated', data: updatedOpportunity })
    } catch (error) {
        next(error)
    }
}
