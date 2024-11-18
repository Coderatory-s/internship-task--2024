import {CourseModel} from '../../models/course'
// import Student from '../../models/student.model';

const getSingleStudent = async (req: any, res: any) => {
    const { courseId, studentId } = req.params

    try {
        // Check if the course exists
        const course = await CourseModel.findById(courseId).populate('enrolledStudents')

        if (!course) {
            return res.status(404).json({ error: 'Course not found' })
        }

        // Check if the student is enrolled in the course
        const student = course.enrolledStudents.find((student: any) => student._id.toString() === studentId)

        if (!student) {
            return res.status(404).json({ error: 'Student not found in this course' })
        }

        res.json(student) // Send student data if found
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching student details' })
    }
}

export default getSingleStudent
