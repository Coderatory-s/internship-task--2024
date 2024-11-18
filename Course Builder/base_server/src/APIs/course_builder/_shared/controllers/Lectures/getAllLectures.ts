import Lecture from '../../models/addLecture.model';

const getAllLectures = async (req:any, res:any) => {
    const { userId, courseId } = req.params; // Extract userId and courseId from route parameters

    try {
        // Validate user ID (ensure the authenticated user is the one requesting the data)
        if (req.user.id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to access this resource.' });
        }

        // Find lectures by courseId
        const lectures = await Lecture.find({ courseId });

        if (!lectures || lectures.length === 0) {
            return res.status(404).json({ message: 'No lectures found for this course.' });
        }

        res.status(200).json({ lectures });
    } catch (error) {
        console.error('Error fetching lectures:', error);
        res.status(500).json({ message: 'Error fetching lectures.' });
    }
};

export default getAllLectures;
