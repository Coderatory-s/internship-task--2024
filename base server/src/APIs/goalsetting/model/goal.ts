import { Schema, Document, model } from 'mongoose'

interface IGoal extends Document {
    title: string
    description: string
    dueDate: Date
    Assignedto: string
    status: 'pending' | 'in-progress' | 'completed'
    createAd: Date
    updateAd: Date
}
const goalSchema = new Schema<IGoal>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: { type: Date, required: true },
        Assignedto: { type: String, required: true },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
    },
    { timestamps: true }
)
const Goal = model<IGoal>('Goal', goalSchema)

export default Goal
export type { IGoal }
