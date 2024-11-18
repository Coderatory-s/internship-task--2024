// controllers/rating.controller.ts

import { Request, Response } from 'express'
import Rating from '../../models/rating.model'
import {CourseModel} from '../../models/course'

export const rateCourse = async (req: Request, res: Response) => {
    const { courseId } = req.params
    const { studentId, rating } = req.body

    try {
        // Create a new rating entry
        const newRating = new Rating({ studentId, courseId, rating })
        await newRating.save()

        // Calculate the new average rating for the course
        const ratings = await Rating.find({ courseId })
        const averageRating = ratings.reduce((sum, rate) => sum + rate.rating, 0) / ratings.length

        // Update the course with the new average rating
        await CourseModel.findByIdAndUpdate(courseId, { averageRating })

        res.json({ message: 'Rating submitted successfully', averageRating })
    } catch (error) {
        res.status(500).send('Error submitting rating.')
    }
}
