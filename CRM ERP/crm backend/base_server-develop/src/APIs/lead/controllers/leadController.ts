import { Request, Response, NextFunction } from 'express'
import leadService from '../services/leadService'
import { leadSchema } from '../validations/leadValidation'

export const createLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { error } = leadSchema.validate(req.body)
        if (error) {
            res.status(400).json({ error: error.details[0].message })
            return // Ensure all paths return a value or next()
        }

        const newLead = await leadService.createLead(req.body)
        res.status(201).json({ message: 'Lead created successfully', data: newLead })
        return // Explicitly return here to satisfy TypeScript
    } catch (error) {
        next(error)
    }
}

// Get all lead
export const getLeads = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const leads = await leadService.getAllLeads()
        res.status(200).json({ data: leads }) // Sends the entire array of leads
    } catch (error) {
        next(error)
    }
}

// Get a lead by ID
export const getLeadById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lead = await leadService.getLeadById(req.params.id)
        if (!lead) {
            res.status(404).json({ error: 'Lead not found' })
            return
        }
        res.status(200).json({ data: lead })
    } catch (error) {
        next(error)
    }
}

// Update a lead
export const updateLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedLead = await leadService.updateLead(req.params.id, req.body)
        if (!updatedLead) {
            res.status(404).json({ error: 'Lead not found' })
            return
        }
        res.status(200).json({ message: 'Lead updated successfully', data: updatedLead })
    } catch (error) {
        next(error)
    }
}

// Delete a lead
export const deleteLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedLead = await leadService.deleteLead(req.params.id)
        if (!deletedLead) {
            res.status(404).json({ error: 'Lead not found' })
            return
        }
        res.status(200).json({ message: 'Lead deleted successfully' })
    } catch (error) {
        next(error)
    }
}

export const qualifyLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params
        const updatedLead = await leadService.updateLeadStatus(id, 'Qualified')

        if (!updatedLead) {
            res.status(404).json({ error: 'Lead not found' })
            return
        }

        res.status(200).json({ message: 'Lead qualified successfully', data: updatedLead })
    } catch (error) {
        res.status(501).json({ error: 'error occured' })
        next(error)
    }
}

export const convertLeadToOpportunity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params
        const result = await leadService.convertLead(id)

        if (result.isAlreadyConverted) {
            // Lead already converted
            res.status(409).json({ message: 'Lead already converted! No need to convert again' })
            return
        } else if (!result.opportunity) {
            // This should not occur because the lead must exist if it reached here
            res.status(404).json({ error: 'Lead not found' })
            return
        }

        // Successfully converted
        res.status(201).json({ message: 'Lead converted to opportunity successfully', data: result.opportunity })
    } catch (error) {
        next(error)
    }
}
