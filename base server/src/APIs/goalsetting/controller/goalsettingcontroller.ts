import { Request, Response } from 'express'
import Goal from '../model/goal'

export const createGoal = async (req: Request, res: Response) => {
    try {
        const goal = new Goal(req.body)
        await goal.save()
        return res.status(201).json({ success: true, data: goal })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error creating goal:', error) // Log error for debugging
        return res.status(500).json({ success: false, message: 'Failed to create goal', error })
    }
}

// export const createGoal = async (req: Request, res: Response) => {
//     try {
//         const { title, description, dueDate, Assignedto } = req.body
//         const newGoal = new Goal({
//             title,
//             description,
//             dueDate,
//             Assignedto
//         })
//         const SavedGoal = await newGoal.save()
//         res.status(201).json(SavedGoal)
//     } catch (error) {
//         res.status(500).json({ message: 'error on creating goal', error })
//     }
// }

//get all goal
export const getAllGoals = async (_req: Request, res: Response) => {
    try {
        const goals = await Goal.find()
        res.status(200).json(goals)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving goals', error })
    }
}

// Get a specific goal by ID
export const getGoalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const goal = await Goal.findById(id)
        if (goal) {
            res.status(200).json(goal)
        } else {
            res.status(404).json({ message: 'Goal not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving goal', error })
    }
}

// Update a goal by ID
export const updateGoal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true })
        if (updatedGoal) {
            res.status(200).json(updatedGoal)
        } else {
            res.status(404).json({ message: 'Goal not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating goal', error })
    }
}

// Delete a goal by ID
export const deleteGoal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deletedGoal = await Goal.findByIdAndDelete(id)
        if (deletedGoal) {
            res.status(200).json({ message: 'Goal deleted successfully' })
        } else {
            res.status(404).json({ message: 'Goal not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting goal', error })
    }
}
