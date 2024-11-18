import mongoose from 'mongoose'
import { IEmployee } from '../types/Employee.interface'
// import { string } from 'joi';
// import bcrypt from 'bcrypt';

const EmployeeSchema = new mongoose.Schema<IEmployee>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },

    // dateOfJoining: {
    //   type: Date,
    //   default: Date.now,
    // },

    isActive: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true, // Set a minimum length for security
        unique: true
    }
})

// Create and export the Employee model
const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema)
export default Employee
