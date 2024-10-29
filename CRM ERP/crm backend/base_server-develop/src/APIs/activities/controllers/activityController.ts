import { Request, Response } from 'express'
import * as activityService from '../services/activityServices' // Adjusted import path
import Lead from '../../lead/models/leadModel' // Import Lead model

export const logActivity = async (req: Request, res: Response) => {
    const { leadId, activityType, description, dateTime, assignedSalesRep } = req.body

    // Check if the lead exists
    const leadExists = await Lead.findById(leadId) // Check if the lead exists
    if (!leadExists) {
        return res.status(404).json({ error: 'No lead found with the provided ID.' }) // Return error if no lead found
    }

    const newActivity = {
        leadId,
        activityType,
        description,
        dateTime,
        assignedSalesRep
    }

    try {
        const activity = await activityService.createActivity(newActivity)
        return res.status(201).json(activity) // Return the response
    } catch (error) {
        return res.status(400).json({ error: 'Failed to log activity.' }) // Return the response
    }
}

export const getActivityById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const activity = await activityService.getActivityById(id)
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found.' })
        }
        return res.status(200).json(activity) // Return the response
    } catch (error) {
        return res.status(400).json({ error: 'Failed to retrieve activity.' }) // Return the response
    }
}

export const getAllActivities = async (_: Request, res: Response) => {
    try {
        const activities = await activityService.getAllActivities()
        return res.status(200).json({ data: activities }) // Return the response
    } catch (error) {
        return res.status(400).json({ error: 'Failed to retrieve activities.' }) // Return the response
    }
}

export const updateActivity = async (req: Request, res: Response) => {
    const { id } = req.params
    const updateData = req.body

    try {
        const updatedActivity = await activityService.updateActivity(id, updateData)
        if (!updatedActivity) {
            return res.status(404).json({ error: 'Activity not found.' })
        }
        return res.status(200).json(updatedActivity) // Return the response
    } catch (error) {
        return res.status(400).json({ error: 'Failed to update activity.' }) // Return the response
    }
}

export const deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedActivity = await activityService.deleteActivity(id)
        if (!deletedActivity) {
            return res.status(404).json({ error: 'Activity not found.' })
        }
        return res.status(200).json({ message: 'Activity deleted successfully' }) // No content response
    } catch (error) {
        return res.status(400).json({ error: 'Failed to delete activity.' }) // Return the response
    }
}
