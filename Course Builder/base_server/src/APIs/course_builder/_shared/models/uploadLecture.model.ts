import mongoose, { Document, Schema } from 'mongoose'
import { ICourse } from './course'

export interface ILecture extends Document {
    courseId: ICourse['_id']
    title: string
    contentType: 'video' | 'article'
    content: string
    createdAt: Date
}

const LectureSchema: Schema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    contentType: { type: String, enum: ['video', 'article'], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Lecture = mongoose.model<ILecture>('Lecture', LectureSchema)

export default Lecture
