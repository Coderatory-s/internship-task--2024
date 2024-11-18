import { Schema, Document, model } from 'mongoose'

interface Iemployee extends Document {
    firstName: string
    LastName: string
    email: string
    position: string
    department: string
    dateOfJoining: Date
    salary: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const employeeSchmea = new Schema<Iemployee>(
    {
        firstName: { type: String, required: true },
        LastName: { type: String, required: true },
        email: { type: String, required: true },
        position: { type: String, required: true },
        department: { type: String, required: true },
        dateOfJoining: { type: Date, required: true },
        salary: { type: Number, required: true },
        isActive: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)

const Employee = model<Iemployee>('Employee', employeeSchmea)

export default Employee
export type { Iemployee }
