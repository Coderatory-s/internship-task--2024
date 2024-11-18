import { CourseModel } from '../models/course'

// Get courses uploaded by the user
export const getCoursesTeacher = async (req: any, res: any): Promise<void> => {
    try {
        const user = req.user // Comes from middleware

        if (!user) {
            res.status(401).json({ error: 'Unauthorized: User not authenticated' })
            return
        }

        // Fetch courses created by the user (using their _id in the 'createdBy' field)
        const userCourses = await CourseModel.find({ createdBy: user._id })

        if (userCourses.length === 0) {
            res.status(404).json({ message: 'No courses found for this user' })
            return
        }

        res.status(200).json({ courses: userCourses })
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
}
