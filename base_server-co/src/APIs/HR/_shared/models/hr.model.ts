import mongoose from 'mongoose'

// hr model svhema we create enum and user.interface in this file

// Define employee roles enum
enum EEmployeeRoles {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
    HR = 'hr',
    ADMIN = 'admin',
}

// Define interface for the HR schema
interface IEmployee extends Document {
    name: string;
    email: string;
    phoneNumber: {
        isoCode: string;
        countryCode: string;
        internationalNumber: string;
    };
    department: string;
    role: EEmployeeRoles;
    attendance: Array<{
        date: Date;
        status: string; // e.g., 'Present', 'Absent', 'On Leave'
    }>;
    progressReport: Array<{
        date: Date;
        report: string;
        evaluator: string;
    }>;
    leaveBalance: {
        annualLeave: number;
        sickLeave: number;
    };
    consent: boolean;
    lastLoginAt: Date | null;
}

// Create the schema
const employeeSchema = new mongoose.Schema<IEmployee>(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 72,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            _id: false,
            isoCode: {
                type: String,
                required: true
            },
            countryCode: {
                type: String,
                required: true
            },
            internationalNumber: {
                type: String,
                required: true
            }
        },
        department: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: EEmployeeRoles,
            default: EEmployeeRoles.EMPLOYEE,
            required: true
        },
        attendance: [
            {
                _id: false,
                date: {
                    type: Date,
                    required: true
                },
                status: {
                    type: String,
                    enum: ['Present', 'Absent', 'On Leave'],
                    required: true
                }
            }
        ],
        progressReport: [
            {
                _id: false,
                date: {
                    type: Date,
                    required: true
                },
                report: {
                    type: String,
                    required: true
                },
                evaluator: {
                    type: String,
                    required: true
                }
            }
        ],
        leaveBalance: {
            _id: false,
            annualLeave: {
                type: Number,
                default: 0,
                required: true
            },
            sickLeave: {
                type: Number,
                default: 0,
                required: true
            }
        },
        consent: {
            type: Boolean,
            required: true
        },
        lastLoginAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

export default mongoose.model<IEmployee>('Employee', employeeSchema);
