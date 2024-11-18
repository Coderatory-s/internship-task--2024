/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from 'express'
import Employee from '../model/employee'

// Add a new employee
export const addEmployee = async (req: Request, res: Response) => {
    try {
        const employee = new Employee(req.body)
        const savedEmployee = await employee.save()
        res.status(201).json(savedEmployee)
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error })
    }
}

// Get all employees
export const getAllEmployees = async (_req: Request, res: Response) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employees', error })
    }
}

// Get an employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const employee = await Employee.findById(id)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' }) // Return here
        }
        return res.status(200).json(employee) // Return here
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving employee', error }) // Return here
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        return res.status(200).json(updatedEmployee)
    } catch (error) {
        return res.status(500).json({ message: 'Error updating employee', error })
    }
}

// Delete an employee
// Delete an employee
export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deletedEmployee = await Employee.findByIdAndDelete(id)
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        return res.status(200).json({ message: 'Employee deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting employee', error })
    }
}
